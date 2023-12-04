import { createSlice } from '@reduxjs/toolkit';

interface BookItem {
    id: number,
    isbn: string,
    title: string,
    cover: string,
    author: string,
    pages: number,
    published: number,
}

interface Book {
    book: BookItem,
    status: number,
}

interface BookState {
    isLoading: boolean;
    isLoadingSearch: boolean;
    books: Book[];
    // bookDetail: BookDetail | null;
    error: string | null;
    isbnId: number | null;
}



const initialState: BookState = {
    isLoading: false,
    isLoadingSearch: false,
    books: [],
    // bookDetail: null,
    error: null,
    isbnId: null,
};

export const bookSlice = createSlice({
    name: 'book',
    initialState,
    reducers: {
        getBookStart: (state) => {
            state.isLoading = true;
        },

        getAddBookSuccess: (state, action) => {
            state.isLoading = false;
            if (state.books == null) {
                state.books = [];
            }
            else {
                state.books.push(action.payload);
            }
        },

        getBooksSuccess: (state, action) => {
            state.isLoading = false;
            state.isLoadingSearch = false;
            if (action.payload == null) {
                state.books = [];
            } else {
                state.books = action.payload;
            }
        },
        
        getBookFailure: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        setIsbn: (state, action) => {
            state.isbnId = action.payload;
        },
        getBookSearchStart: (state) => {
            state.isLoadingSearch = true;
        }

        // getBookDetailStart: (state) => {
        //     state.isLoading = true;
        // },
        // getBookDetailSuccess: (state, action: GetBookDetailSuccessAction) => {
        //     state.isLoading = false;
        //     state.BookDetail = action.payload;
        // },
        // getBookDetailFailure: (state) => {
        //     state.isLoading = false;
        // },
        // postBookStart: (state) => {
        //     state.isLoading = true;
        // },
        // postBookSuccess: (state) => {
        //     state.isLoading = false;
        // },
        // postBookFailure: (state) => {
        //     state.isLoading = false;
        // },
    },
});

export const {
    getBookStart,
    getAddBookSuccess,
    getBooksSuccess,
    getBookFailure,
    getBookSearchStart,

} = bookSlice.actions;

export default bookSlice.reducer;
