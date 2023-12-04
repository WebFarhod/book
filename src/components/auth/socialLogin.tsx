import { FC } from 'react';
import './socialLogin.scss'

interface SocialLoginProps {
 img: string;
 text: string;
}

const SocialLogin: FC<SocialLoginProps> = ({ img, text }) => {
 return (
   <div className='button'>
     <img className='img' src={img} alt="" />
     <p>{text}</p>
   </div>
 )
}

export default SocialLogin;
