import FireContext from "FireContext"
import { PhotoData } from "appType"
import { FormFieldColumn, FormFieldRow } from "components/common/vamper/form.styled"
import { useContext, useRef, useState } from "react"

export const GalleryFilter = () => {

    const { originalList, setPhotosList } = useContext(FireContext)
    const [ filterPublic, setFilterPublic ] = useState<boolean | string>(false)
    const [ filterSearch, setFilterSearch ] = useState<string>('')
    const [ valueText, setValueText ] = useState<string>('all')

    const inputRef = useRef<HTMLInputElement | null>(null)

    const handleSelected = (e: React.ChangeEvent<HTMLSelectElement>) => {
        /// setFilter((prev: FilterType) => ({ ...prev, status: e.target.value }))
        const status = e.target.value
        if (status === 'all') {
            setPhotosList(originalList)
            setFilterPublic('all')
            setValueText('Todas')
        } else {
            const publicValue = Boolean(Number(status))
            setPhotosList(
                originalList.filter(
                    (item: PhotoData) => item.public === publicValue
                ).filter(
                    (item: PhotoData) => item.file_name.includes(filterSearch)
                )
            )
            setFilterPublic(publicValue)
            setValueText(publicValue ? 'Publicadas' : 'No publicadas')
        }
    }

    const handleSearch = (e: any) => {
        e.preventDefault()
        if (originalList.length === 0) return alert('No hay datos para filtrar')
        const search = e.target[0].value.trim()
        if (search === filterSearch) return
        if (search.length === 0) {
            setPhotosList(originalList)
            setFilterSearch('')
            return
        }
        setPhotosList(
            originalList.filter(
                (item: PhotoData) => item.file_name.includes(search)
            ).filter(
                (item: PhotoData) => item.public === filterPublic || filterPublic === 'all'
            )
        )
        setFilterSearch(search)
    }

    return <div style={{width: '200px'}}>
        <FormFieldRow>
            <p>Estado</p><select onChange={handleSelected} >
                <option value='all'>Todas</option>
                <option value='1'>Publicadas</option>
                <option value='0'>No publicadas</option>
            </select>
        </FormFieldRow>
        <form onSubmit={handleSearch}>
            <FormFieldColumn>
                <p>Buscar</p>
                <input ref={inputRef} type="text" placeholder="Nombre" />
                <button type='submit'>Buscar</button>

                <p>Filtro aplicado</p>
                <FormFieldRow>
                    <p>Estado:</p> <p>{valueText}</p>
                </FormFieldRow>

                <FormFieldRow>
                    <p>Busqueda:</p><p>{filterSearch || '-'}</p>
                </FormFieldRow>

                <FormFieldColumn>
                    <button type='button' onClick={() => {
                        setPhotosList(originalList)
                        setFilterPublic('all')
                        setFilterSearch('')
                        if (inputRef.current) inputRef.current.value = '';
                        inputRef.current?.focus()
                    }}>Resetear filtros</button>
                </FormFieldColumn>

            </FormFieldColumn>
        </form>
    </div>
}