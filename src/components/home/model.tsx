
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import './modal.scss'
import { Input } from '../home';
// import { coverIcon, publishedIcon } from '../../constant';
import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getBookStart, getAddBookSuccess } from '../../slice/book';
import BookService from '../../service/book';
// import { RootState } from '../../store';

interface MyProps {
    open: boolean;
    hand: () => void;
}



// interface IBook {
//     title: string,
//     author: string,
//     cover: string,
//     published: string,
//     pages: string,
// }

const style = {
    width: 430,
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    padding: '24px 28px',
    bgcolor: '#FEFEFE',
    boxShadow: ' 0px 4px 32px 0px rgba(51, 51, 51, 0.04)',
    gap: '28px',

};

const ModalAdd: FC<MyProps> = ({ open, hand }) => {

    const [title, setTitle] = useState<string>('')
    const [author, setAuthor] = useState<string>('')
    const [cover, setCover] = useState<string>('')
    const [published, setPublished] = useState<string>('')
    const [pages, setPages] = useState<string>('')

    // const { books } = useSelector((state: RootState) => state.book);
    const dispatch = useDispatch()

    

    const addBook = async (e: Event) => {
        console.log('start')
        e.preventDefault()
        dispatch(getBookStart())

        // const bookData: IBook = {
        //     title: title,
        //     author: author,
        //     cover: cover,
        //     published: published,
        //     pages:pages
        // }

        try {
            // const response = 
            const res = await BookService.createBook()
            console.log('modal', res)
            // const res1 = await BookService.addBook(bookData, books)

            dispatch(getAddBookSuccess(res))
            hand()
        } catch (err) {
            console.log(err);
        }
    }
    // const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    //     addBook()
    // };

    return (



        <div>
            <Modal
                open={open}
            // onClose={hand}
            >
                <Box sx={style}>
                    <div className="div-modal">
                        <div className='modal-header'>
                            <p>Create a book</p>
                            <button className='modal-x' onClick={() => hand()}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                                    <path d="M15 9.5L9 15.5M9 9.5L15 15.5M22 12.5C22 18.0228 17.5228 22.5 12 22.5C6.47715 22.5 2 18.0228 2 12.5C2 6.97715 6.47715 2.5 12 2.5C17.5228 2.5 22 6.97715 22 12.5Z" stroke="#151515" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                        <div className="modal-input">
                            <Input label={'Title'} type={'text'} placeholder={'Enter your title'} state={title} setState={setTitle} />
                            <Input label={'Author'} type={'text'} placeholder={'Enter your author'} state={author} setState={setAuthor} />
                            <Input label={'Cover'} type={'number'} placeholder={'Enter your Cover'} state={cover} setState={setCover} />
                            <Input label={'Published'} type={'number'} placeholder={'Enter your published'} state={published} setState={setPublished} />
                            <Input label={'Pages'} type={'number'} placeholder={'Enter your pages'} state={pages} setState={setPages} />

                        </div>
                        <div className='div-button'>
                            <button onClick={hand} className='button btn1'>Close</button>
                            <button className='button btn2' type='submit' onClick={()=>addBook}>Submit</button>
                        </div>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}

export default ModalAdd