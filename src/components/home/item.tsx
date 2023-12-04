import { FC } from 'react'
import './item.scss'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { LinearProgress } from '@mui/material';

const DivItem = styled(Paper)(({ }) => ({
  display: "flex",
  flexDirection: 'column',
  padding: '32px',
  border: '1px solid #EBEBEB',
  gap: '16px'
}));

interface BookItem {
  id: number,
  isbn: string,
  title: string,
  cover: string,
  author: string,
  pages: number,
  published: number,
}

interface IBook {
  book: BookItem,
  status: number,
}

const Item: FC = () => {
  const { books, isLoading } = useSelector((state: RootState) => state.book);

  return (
    <div className='div-item'>

      {isLoading &&
        <Box sx={{ width: '100%' }}>
          <LinearProgress color="secondary"
          />
        </Box>
      }
      <Box sx={{ flexGrow: 0, width: '100%', m: '0', p: '0' }}>
        <Grid container spacing={1}>

          <br />
          {
            books !== null ?
              (
                books?.map((item: IBook, index) => (
                  <Grid key={index} item xs={12} sm={5} md={6} xl={4} >
                    <DivItem>
                      <div className='item-body'>
                        <h3 className='title'>{item.book.title}</h3>
                        <p className='disc'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eius nam veritatis reiciendis soluta molestiae! Perspiciatis.</p>
                      </div>

                      <div className='footer'>
                        <div className="info">
                          <p className='creator'>{item.book.author}:</p>
                          <p className="date">{item.book.published}-year</p>
                        </div>
                        <div className="page">
                          <p>{item.book.pages} pages</p>
                        </div>
                      </div>
                    </DivItem>
                  </Grid>
                ))
              ) : <></>
          }
        </Grid>
      </Box>
    </div>
  );
}

export default Item
