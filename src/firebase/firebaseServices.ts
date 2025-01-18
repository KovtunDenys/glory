import { collection, doc, getDoc, getDocs, setDoc, updateDoc } from 'firebase/firestore';  
import { db } from '../firebase.config';

export const addUserToFirebase = async (user: { id: number, points: number, lastMining?: Date, youTubeSubs: boolean, tikTokSubs: boolean, instagramSubs: boolean, userName:string }) => {
  try {
    const userRef = doc(collection(db, 'users'), String(user.id));  

    await setDoc(userRef, {
      id: user.id,
      userName: user.userName,
      points: user.points,
      lastMining: user.lastMining || null,
      youTubeSubs: user.youTubeSubs,
      tikTokSubs: user.tikTokSubs,
      instagramSubs: user.instagramSubs,
    });

    console.log("User added to Firebase successfully");
  } catch (error) {
    console.error("Error adding user to Firebase:", error);
    throw new Error('Error adding user to Firebase');
  }
};


export const getUserById = async (userId: number) => {
  try {
    const userRef = doc(db, 'users', String(userId));  

    const docSnap = await getDoc(userRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("No such user!");
      return null;
    }
  } catch (error) {
    console.error("Error getting user:", error);
    throw new Error('Error getting user');
  }
};

export const updateInviteInFirebase = async (user: { id: number, invitedFriends?: number[] }) => {
    try {
        const userRef = doc(db, 'users', String(user.id));

        await updateDoc(userRef, {
            invitedFriends: user.invitedFriends 
        });

        console.log("User updated in Firebase successfully");
    } catch (error) {
        console.error("Error updating user in Firebase:", error);
        throw new Error('Error updating user in Firebase');
    }
};

export const updateMiningInFirebase = async (userId: number, newPoints: number, date: Date) => {
    try {
      const userRef = doc(db, 'users', String(userId)); 
  
      await updateDoc(userRef, {
        points: newPoints ,
        lastMining: date
      });
  
      console.log("User points updated in Firebase successfully");
    } catch (error) {
      console.error("Error updating user points in Firebase:", error);
      throw new Error('Error updating user points in Firebase');
    }
  };

  export const updateSubscriptionInFirebase = async (userId: number, subscriptionData: { [key: string]: boolean }) => {
    try {
      const userRef = doc(db, 'users', String(userId));
      await updateDoc(userRef, subscriptionData); 
  
      console.log("Subscription updated successfully in Firebase");
    } catch (error) {
      console.error("Error updating subscription in Firebase:", error);
      throw new Error('Error updating subscription in Firebase');
    }
  };

  export const getUserNamesByIds = async (userIds: number[]): Promise<string[]> => {
    try {
      const promises = userIds.map(async (userId) => {
        const userRef = doc(db, 'users', String(userId));
        const docSnap = await getDoc(userRef);
  
        if (docSnap.exists()) {
          const userData = docSnap.data();
          return userData.userName;
        } else {
          console.warn(`User with ID ${userId} not found`);
          return null;
        }
      });
      const userNames = await Promise.all(promises);
      return userNames.filter((name) => name !== null);
    } catch (error) {
      console.error('Error fetching usernames by IDs:', error);
      throw new Error('Error fetching usernames by IDs');
    }
  };
  
  export const updateUserPointsInFirebase = async (userId: number, points: number) => {
    try {
      const userRef = doc(db, 'users', String(userId));  
  
      await updateDoc(userRef, {
        points: points  
      });
  
      console.log("User points updated in Firebase successfully");
    } catch (error) {
      console.error("Error updating user points in Firebase:", error);
      throw new Error('Error updating user points in Firebase');
    }
  };

  export const getAllUsers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'users'));
      
      // Преобразуем данные в нужный формат
      const users = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          userName: data.userName || 'Unknown', // Убедитесь, что имя есть
          points: data.points || 0,             // Убедитесь, что очки есть
        };
      });
  
      return users;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw new Error('Error fetching users');
    }
  };
  
