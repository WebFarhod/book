import { useEffect, useState } from 'react';
import './pageHome.scss'
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import { Box, IconButton, LinearProgress, Menu, MenuItem, SvgIcon, Tooltip, Typography } from '@mui/material';
import { user } from '../constant/home/navbar';
import { Item, Title } from '../components/home';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../slice/auth';
import { removeItem } from '../helpers/storage';
import { getBookSearchStart, getBookStart, getBooksSuccess } from '../slice/book';
import BookService from '../service/book';
import { RootState } from '../store';

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#FF4D4F',
        color: '#FF4D4F',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: "-1px",
            left: '-1px',
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}));

const settings = ['Logout'];

const pageHome = () => {
    const [isInputFocused, setInputFocus] = useState(false);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const [search, setSearch] = useState<string>('')

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { loggedIn } = useSelector((state: RootState) => state.auth)
    const { isLoadingSearch } = useSelector((state: RootState) => state.book)

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const logoutHandler = () => {
        removeItem('Sign')
        console.log('logout')
        dispatch(logoutUser())
        removeItem('Key')
        removeItem('Secret')
        navigate('/auth')
    }

    const searchX = async () => {
        if (!isLoadingSearch) {
            setInputFocus(false)
            setSearch('')
            await getBook()
        }
    }

    const getBook = async () => {
        dispatch(getBookStart())
        try {
            const response = await BookService.getBook();
            dispatch(getBooksSuccess(response))
        } catch (error) {
            console.log(error)
        }
    }

    const inputSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
        const data = search
        if (data !== '') {
            console.log(data)
            dispatch(getBookSearchStart())
            try {
                const res = await BookService.searchBook(data)
                dispatch(getBooksSuccess(res))
            } catch (err) {
                console.log(err);
            }
        }
    }

    useEffect(() => {
        if (!loggedIn) {
            navigate('/auth')
        }
        getBook()
    }, [loggedIn])
    return (
        <div className='home'>
            <div className="navbar">
                <div className="left">
                    <div className="logo">
                        <SvgIcon>
                            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill="none">
                                <path fillRule="evenodd" clipRule="evenodd" d="M23.2965 13.8285C23.4013 13.933 23.4844 14.0571 23.5411 14.1938C23.5978 14.3305 23.627 14.477 23.627 14.625C23.627 14.773 23.5978 14.9195 23.5411 15.0562C23.4844 15.1928 23.4013 15.317 23.2965 15.4215L16.5465 22.1715C16.442 22.2763 16.3179 22.3594 16.1812 22.4161C16.0445 22.4728 15.898 22.502 15.75 22.502C15.602 22.502 15.4555 22.4728 15.3188 22.4161C15.1822 22.3594 15.058 22.2763 14.9535 22.1715L11.5785 18.7965C11.4739 18.6919 11.3909 18.5677 11.3343 18.4311C11.2777 18.2944 11.2486 18.1479 11.2486 18C11.2486 17.8521 11.2777 17.7056 11.3343 17.5689C11.3909 17.4323 11.4739 17.3081 11.5785 17.2035C11.6831 17.0989 11.8073 17.0159 11.944 16.9593C12.0806 16.9027 12.2271 16.8736 12.375 16.8736C12.5229 16.8736 12.6694 16.9027 12.8061 16.9593C12.9427 17.0159 13.0669 17.0989 13.1715 17.2035L15.75 19.7842L21.7035 13.8285C21.808 13.7237 21.9322 13.6406 22.0688 13.5839C22.2055 13.5272 22.352 13.498 22.5 13.498C22.648 13.498 22.7945 13.5272 22.9312 13.5839C23.0679 13.6406 23.192 13.7237 23.2965 13.8285Z" fill="white" />
                                <path d="M9.9135 7.5195C12.1623 5.5803 15.0305 4.50931 18 4.5C24.0525 4.5 29.0768 9 29.6235 14.8027C33.2055 15.309 36 18.3082 36 21.9893C36 26.0302 32.6295 29.25 28.5457 29.25H8.50725C3.843 29.25 0 25.5735 0 20.9655C0 16.9987 2.8485 13.7137 6.6195 12.8812C6.94125 10.9395 8.19 9.0045 9.9135 7.5195ZM11.3827 9.22275C9.6795 10.692 8.7885 12.4628 8.7885 13.8488V14.8568L7.78725 14.967C4.644 15.3112 2.25 17.892 2.25 20.9655C2.25 24.2663 5.0175 27 8.50725 27H28.5457C31.455 27 33.75 24.723 33.75 21.9893C33.75 19.2532 31.455 16.9762 28.5457 16.9762H27.4207V15.8512C27.423 10.8563 23.238 6.75 18 6.75C15.5697 6.75971 13.2229 7.63748 11.3827 9.225V9.22275Z" fill="#6200EE" />
                            </svg>
                        </SvgIcon>
                        <p >Book <span>List</span></p>
                    </div>
                    <div className={`div-search-loader  ${isInputFocused ? 'search-focus' : ''}`}>
                        <div className={`search`}>
                            <SvgIcon>
                                <svg className='search-icon' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M21 21L16.65 16.65M11 6C13.7614 6 16 8.23858 16 11M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
                                        stroke={isInputFocused ? '#151515' : '#FEFEFE'}
                                        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </SvgIcon>

                            <input
                                className='search-input'
                                type="text"
                                placeholder='Search for any training you want '
                                onFocus={() => setInputFocus(true)}
                                // onBlur={() => setInputFocus(false)}
                                value={search}
                                onChange={e => inputSearch(e)}
                            />

                            <button className='search-x' onClick={searchX}>
                                <SvgIcon>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <g clipPath="url(#clip0_202_182)">
                                            <path d="M12.5 7.50002L7.49996 12.5M7.49996 7.50002L12.5 12.5M18.3333 10C18.3333 14.6024 14.6023 18.3334 9.99996 18.3334C5.39759 18.3334 1.66663 14.6024 1.66663 10C1.66663 5.39765 5.39759 1.66669 9.99996 1.66669C14.6023 1.66669 18.3333 5.39765 18.3333 10Z" stroke="#333333" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_202_182">
                                                <rect width="20" height="20" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </SvgIcon>
                            </button>
                        </div>
                        {isLoadingSearch ?
                            <Box sx={{ width: '100%' }}>
                                <LinearProgress color="secondary"
                                />
                            </Box> :
                            <></>
                        }
                    </div>
                </div>
                <div className="right">
                    <StyledBadge
                        overlap="circular"
                        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                        variant="dot"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M9.35419 21C10.0593 21.6224 10.9856 22 12 22C13.0145 22 13.9407 21.6224 14.6458 21M18 8C18 6.4087 17.3679 4.88258 16.2427 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.8826 2.63214 7.75738 3.75736C6.63216 4.88258 6.00002 6.4087 6.00002 8C6.00002 11.0902 5.22049 13.206 4.34968 14.6054C3.61515 15.7859 3.24788 16.3761 3.26134 16.5408C3.27626 16.7231 3.31488 16.7926 3.46179 16.9016C3.59448 17 4.19261 17 5.38887 17H18.6112C19.8074 17 20.4056 17 20.5382 16.9016C20.6852 16.7926 20.7238 16.7231 20.7387 16.5408C20.7522 16.3761 20.3849 15.7859 19.6504 14.6054C18.7795 13.206 18 11.0902 18 8Z" stroke="#151515" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        {/* <MailIcon color="action" /> */}
                    </StyledBadge>

                    {/* </Badge> */}

                    <div className='user'>
                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar
                                        alt="Remy Sharp"
                                        src={user}
                                        sx={{ width: 26, height: 26 }}
                                    />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {settings.map((setting) => (
                                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                        <Typography textAlign="center" onClick={logoutHandler} >{setting}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                    </div>
                </div>
            </div>

            <div className="body">
                <Title />
                <Item />
            </div>


        </div >
    )
}

export default pageHome