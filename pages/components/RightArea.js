import React from 'react'
import Image from 'next/image'
import CloseIcon from "../../public/closeIcon.svg"
import styles from "../../styles/RightArea.module.css"
import temp from "../../public/defaultProfilePicture.png"
import { Result } from 'postcss'
import Swal from 'sweetalert2'

function RightArea({ data, followers, followings, socialData }) {

    const closeRightArea = () => {
        const rightArea = document.getElementById("rightMain")

        const slideRightKeyframe = [{
            transform: "translateX(0%)"
        },
        {
            transform: "translateX(100%)"
        }
        ]
        rightArea.animate(slideRightKeyframe, {
            duration: 250,
            fill: "forwards"
        })

        window.setTimeout(() => {
            rightArea.style.display = ""
        }, 250)
    }

    const remove = async (e, follower) => {
        const jsonData = {
            Data: data,
            FollowerEmail: follower.Email,
            FollowerCount: data.Followers,
            SocialData: socialData
        }
        e.target.innerText = "Please Wait..."
        const response = await fetch(`http://localhost:3000/api/RemoveFollower`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonData)
        })
        const result = await response.json()
        if (result.message == "Follower removed successfully!") {
            const Toast = Swal.mixin({
                toast: true,
                position: "bottom-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            });
            Toast.fire({
                icon: "success",
                title: "Follower Removed Successfully"
            });

            document.getElementById("Follower#" + follower.email).style.display = "none";
            followers.filter(current => {
                return current.email != follower.email
            })
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: result.message,
            })
            e.target.innerText = "Remove"
        }
    }

    const unfollowUser = async (e, following) => {
        const jsonData = {
            Data: data,
            FollowingEmail: following.Email,
            FollowingCount: data.Following,
            SocialData: socialData
        }
        e.target.innerText = "Please Wait..."
        const response = await fetch(`http://localhost:3000/api/UnfollowFollowing`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonData)
        })
        const result = await response.json()
        if (result.message == "Unfollowed successfully!") {
            const Toast = Swal.mixin({
                toast: true,
                position: "bottom-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            });
            Toast.fire({
                icon: "success",
                title: "Unfollowed Successfully"
            });

            document.getElementById("Following#" + following.email).style.display = "none";
            followings.filter(current => {
                return current.email != following.email
            })
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: result.message,
            })
            e.target.innerText = "Unfollow"
        }
    }

    return (
        <div className={styles.rightLayout} id='rightMain'>
            <div className={styles.followersList} id="followersList">
                <div className={styles.followersListHeader} id="followersListHeader">
                    <div className={styles.followersListHeaderClose} id="followersListHeaderClose" onClick={closeRightArea}>
                        <Image alt="Close" src={CloseIcon} />
                    </div>
                    <br /><br />
                    <div className={styles.followersListHeaderText} id="followersListHeaderText">Followers</div>
                </div>
                <div id="followersListBody" className={styles.followersListBody}>

                    {
                        followers.map((follower, index) => {
                            return (
                                <div
                                    className="ml-2.5 mt-2.5 flex flex-row justify-evenly items-center" key={"Follower#" + follower.email} id={'Follower#' + follower.email} >
                                    <div
                                        className='h-16 w-16 rounded-full border-2 border-solid border-black'
                                    >
                                        <Image
                                            className='h-full w-full object-cover rounded-full border-2 border-black'
                                            src={temp}
                                            width={60} height={60} alt="Profile Image" />
                                    </div>
                                    <div class="profileDetails">
                                        <div
                                            className="mt-[3px] mb-[3px] ml-0 mr-0 text-[18px] font-bold " >{follower.Name}</div>
                                        <div
                                            className="text-[15px] mt-[3px] mb-[3px] ml-0 mr-0" >{follower.Email}</div>
                                        <div >
                                            <div
                                                onClick={(e) => remove(e, follower)}
                                                className={styles.unfollowBtn}
                                            >Remove</div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }

                </div>
            </div>

            <div className={styles.followingList} id="followingList">
                <div className={styles.followingListHeader} id="followingListHeader" >
                    <div className={styles.followingListHeaderClose} id="followingListHeaderClose" onClick={closeRightArea}>
                        <Image alt="Close" src={CloseIcon} />
                    </div>
                    <br /><br />
                    <div className={styles.followingListHeaderText} id="followingListHeaderText">Following</div>
                </div>
                <div id="followingListBody" className={styles.followingListBody}>
                    {
                        followings.map((following, index) => {
                            return (
                                <div
                                    className="ml-2.5 mt-2.5 flex flex-row justify-evenly items-center" key={"Following#" + following.email} id={"Following#" + following.email} >
                                    <div
                                        className='h-16 w-16 rounded-full border-2 border-solid border-black'
                                    >
                                        <Image
                                            className='h-full w-full object-cover rounded-full border-2 border-black'
                                            src={temp}
                                            width={60} height={60} alt="Profile Image" />
                                    </div>
                                    <div class="profileDetails">
                                        <div
                                            className="mt-[3px] mb-[3px] ml-0 mr-0 text-[18px] font-bold " >{following.Name}</div>
                                        <div
                                            className="text-[15px] mt-[3px] mb-[3px] ml-0 mr-0" >{following.Email}</div>
                                        <div >
                                            <div
                                                className={styles.unfollowBtn}
                                                onClick={(e) => unfollowUser(e, following)}
                                            >Unfollow</div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>

        </div >
    )
}

export default RightArea
