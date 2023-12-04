import { getItem } from '../helpers/storage';
import axios from './api';
import CryptoJS from 'crypto-js';



interface Ibook {
    author: string;
    cover: string;
    id: number;
    isbn: string;
    pages: number;
    published: number;
    title: string;
}

interface Ires {
    book: Ibook;
    status: number;
}




// interface ISearchBook {
//     author: string;
//     cover: string;
//     isbn: string;
//     published: number;
//     title: string;
//     id: number;
//     pages: number;
// }

interface IItem {
    author: string;
    cover: string;
    isbn: string;
    published: number;
    title: string;
}

// interface EditBook {
//     book: {
//         author: string,
//         isbn: string,
//         title: string,
//         published: number,
//         pages: number
//     },
//     status: number
// }

interface Isbn {
    isbn: string;
}

interface BookService {
    getBook: () => Promise<any>;
    searchBook: (title: string) => Promise<any>;
    createBook: () => Promise<any>;
    // userSignIn: (body: Body) => Promise<any>;
}

const BookService: BookService = {

    async getBook() {
        const signstr = 'GET' + '/books' + getItem('Secret')
        const sign = CryptoJS.MD5(signstr).toString();

        const response = await axios.get('/books', {
            headers: {
                'Content-Type': 'application/json',
                'Key': `${getItem('Key')}`,
                'Sign': `${sign}`
            }
        });

        let res: {
            book: {
                author: string;
                cover: string;
                id: number;
                isbn: string;
                pages: number;
                published: number;
                title: string;
            };
            status: number;
        }[] | null

        if (response.data.data == null) {
            res = null
        } else {
            res = response.data.data
        }

        return res
    },

    async searchBook(title: string) {
        const signstr = 'GET' + `/books/${title}` + getItem('Secret')
        const sign = CryptoJS.MD5(signstr).toString();

        const response = await axios.get(`/books/${title}`, {
            headers: {
                'Content-Type': 'application/json',
                'Key': `${getItem('Key')}`,
                'Sign': `${sign}`
            }
        });
        const data = response.data.data;
        let resData: Ires;
        let res: Ires[] = []

        data.map((item: IItem, index: number) => {
            resData = {
                book: {
                    author: item.author,
                    cover: item.cover,
                    id: index,
                    isbn: item.isbn,
                    pages: 0,
                    published: item.published,
                    title: item.title,
                },
                status: 0,
            }
            res.push(resData);
        })

        return res;
    },


    async createBook() {

        function getRandomIsbn(min: number, max: number): number {
            return Math.floor(Math.random() * (max - min) + min);
        }
        const isbnId = getRandomIsbn(1, 1000).toString()

        let isbn: Isbn = {
            'isbn': isbnId
        }

        const signstr = 'POST' + '/books' + JSON.stringify(isbn) + getItem('Secret')
        const sign = CryptoJS.MD5(signstr).toString();

        const response = await axios.post('/books', isbn, {
            headers: {
                'Content-Type': 'application/json',
                'Key': `${getItem('Key')}`,
                'Sign': `${sign}`
            }
        });

        let res: Ires | null = null

        const data = response.data.data
        if (response.data.data == null) {
            res = null
        }
        else {
            res = {
                book: {
                    author: data.author,
                    cover: data.cover,
                    id: data.id,
                    isbn: data.isbn,
                    pages: data.pages,
                    published: data.published,
                    title: data.title,
                },
                status: 0,
            }
        }

        return res

        // console.log(response)
        // console.log(isbnId)
        // let idBook:number|null=null

        // console.log(books)
        // books.map((item: Book) => {
        //     if (item.isbn == isbnId) {
        //         idBook = item.id
        //     }
        // })


        // console.log(response.data)
        // return response.data;

        // console.log(idBook)

        // let editBook: EditBook = {
        //     book: {
        //         isbn: isbn.isbn,
        //         title: bookData.title,
        //         author: bookData.author,
        //         published: bookData.published,
        //         pages: bookData.pages
        //     },
        //     status: 0
        // }

        // const signstr1 = 'PATCH' + '/books' + idBook + JSON.stringify(editBook) + getItem('Secret')
        // console.log(signstr1)

        // /books/1{
        //     "status": 3483473
        // }MyKalitSirojjon




        // const data = await axios.post('/signup', body, {
        //     headers: {
        //         'Content-Type': 'application/json',
        //     }
        // });

        // console.log(data);
        // console.log('register');
        // return data.data;
    },

    // async createBook()
};

export default BookService;
