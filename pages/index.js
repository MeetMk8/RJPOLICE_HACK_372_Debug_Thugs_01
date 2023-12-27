import React from 'react'
import Navbar from './components/Navbar'
import LeftArea from './components/LeftArea'
import RightArea from './components/RightArea'
import MidArea from './components/MidArea'
import styles from '../styles/Index.module.css'

function home({ data, socialData }) {

    return (
        <div className='h-screen overflow-hidden'>
            <Navbar />
            <div className={styles.setBottomLayout}>
                <LeftArea data={data} />
                <MidArea />
                <RightArea data={data} followers={socialData.response.FollowersList} followings={socialData.response.FollowingsList} socialData={socialData} />
            </div>
        </div>
    )
}

export default home

export async function getServerSideProps() {

    const jsonData = {
        Email: "tirthdesai536@gmail.com"
    }
    const response = await fetch(`http://localhost:3000/api/GetUserData/${jsonData.Email}`)
    const data = await response.json()

    const socialDataResponse = await fetch(`http://localhost:3000/api/GetSocialData/${jsonData.Email}`)
    const socialData = await socialDataResponse.json()

    data.profileUrl = `https://finestdirection.backendless.app/api/files/BlogPage/ProfilePictures/${data.objectId}.jpg`


    return {
        props: {
            data: data.UserData,
            socialData: socialData
        },
    }
}