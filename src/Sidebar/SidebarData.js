import React from 'react'
import * as FaIcons from 'react-icons/fa';
import * as GrIcons from 'react-icons/gr';

export const SidebarDate = [
    {
        title: '닉네임',
        path: '/',
        icon: <FaIcons.FaUserCircle />,
        cName: 'nav-text'
    },
    {
        title: '내정보',
        path: '/reports',
        icon: <FaIcons.FaUserCog />,
        cName: 'nav-text'
    },
    {
        title: '메세지',
        path: '/products',
        icon: <FaIcons.FaRegComments />,
        cName: 'nav-text'
    },
    {
        title: '포인트',
        path: '/team',
        icon: <GrIcons.GrMoney />,
        cName: 'nav-text'
    },
    {
        title: '게임 기록',
        path: '/messages',
        icon: <FaIcons.FaEnvelopeOpenText />,
        cName: 'nav-text'
    },
]