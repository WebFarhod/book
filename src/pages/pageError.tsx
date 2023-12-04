import { page404 } from '../constant'
import './pageError.scss'

const pageError = () => {
  return (
    <div className='error'>
      <img className='img' src={page404} alt="" />

      <div className='div-button'>
        <button className='button btn1'>Go Home Page</button>
        <button className='button btn2'>Reload Page</button>
      </div>
    </div>
  )
}

export default pageError