import React, { FC } from 'react'
import './title.scss'
import { Button } from '@mui/material'
import { Add } from '@mui/icons-material'
import { ModalAdd } from '.'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'

const Title: FC = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { books } = useSelector((state: RootState) => state.book)


  return (
    <div className='div-title '>
      <div className='up d-md-flex'>
        <div className='title'>You’ve got <div> {books == null ? '0' : books.length} book</div></div>
        <div className='right'>
          <input
            className='input'
            type="text"
            placeholder='Enter your name'
          // onFocus={() => setInputFocus(true)}
          // onBlur={() => setInputFocus(false)} 
          />
          <div className='d-none d-sm-block'>
            <Button
              onClick={handleOpen}
              sx={{
                display: 'flex',
                padding: '10px 20px',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '12px',
                borderRadius: '4px',
                textTransform: 'none',
                bgcolor: '#6200EE',
                '&:hover': {
                  backgroundColor: '#9654F4',
                },
              }}
              variant="contained"
              startIcon={<Add />}>
              Create a book
            </Button>
          </div>
          <div className='d-sm-none'>
            <Button
              onClick={handleOpen}
              sx={{
                padding: '15px 15px',
                minWidth: '45px',
                height: '45px',
                boxSizing: 'border-box',
                bgcolor: '#6200EE',
                '&:hover': {
                  backgroundColor: '#9654F4',
                },
              }}
              variant="contained"
              startIcon={<Add />}>
            </Button>
          </div>


        </div>
      </div>

      <div className="down">
        <p>Your task today</p>
      </div>

      <ModalAdd
        open={open} hand={() => { handleClose() }}
      />
    </div>

  )
}

export default Title