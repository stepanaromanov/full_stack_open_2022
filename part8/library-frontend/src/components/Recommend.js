import { useQuery, useLazyQuery } from '@apollo/client'
import { MY_DATA, ALL_BOOKS } from '../queries'
import { useState, useEffect } from 'react'

const Recommend = () => {
    const [recommendedBooks, setRecommendedBooks] = useState([])
    const [favoriteGenre, setFavoriteGenre] = useState('')
    const user  = useQuery(MY_DATA)
    const [booksResult, { data }] = useLazyQuery(ALL_BOOKS)

    useEffect(() => {
        if (user.data) {
            setFavoriteGenre(user.data.me.favoriteGenre)
        }
    }, [user.data])

    useEffect(() => {
        if (favoriteGenre) {
            booksResult({ variables: { genre: favoriteGenre } })
        }
    }, [booksResult, favoriteGenre])

    useEffect(() => {
        if (data) {
            setRecommendedBooks(data.allBooks)
        }
    }, [data])

    if (!favoriteGenre || !recommendedBooks) {
        return null
    }

    return (
        <div>
            <h2>recommendations</h2>
            <p>books in your favorite genre <b>{favoriteGenre}</b></p>
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>author</th>
                        <th>published</th>
                    </tr>
                    {recommendedBooks.map((b) => (
                        <tr key={b.title}>
                        <td>{b.title}</td>
                        <td>{b.author.name}</td>
                        <td>{b.published}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Recommend