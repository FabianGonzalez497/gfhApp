import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useDispatch, useSelector } from "react-redux";
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './TabNavigator';
import AuthNavigator from "./AuthNavigator";
import { useGetProfilePictureQuery } from "../SERVICES/userServices";
import { setProfilePicture, useProfilePicture } from '../FEATURES/AUTH/authSlice'
import { useEffect } from "react";



const MainNavigator = () => {
    const user = useSelector(state => state.auth.value.email);
    const localId = useSelector(state => state.auth.value.localId)
    const dispatch = useDispatch()

    const { data: profilePicture, error, isLoading } = useGetProfilePictureQuery(localId)

    useEffect(() => {
        if (profilePicture) {
            console.log(profilePicture)
            dispatch(setProfilePicture(profilePicture.image))
        }
    }, [profilePicture])

    return (
        <NavigationContainer>
            {user ? <TabNavigator /> : <AuthNavigator />}
        </NavigationContainer>
    );
};

export default MainNavigator;
