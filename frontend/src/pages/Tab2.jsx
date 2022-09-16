import { IonBackdrop,IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { memo } from 'react';
import './Tab2.css'; 

const Tab2 = memo(() => {
  return (
    <IonPage>
                     

      <IonHeader>
        <IonToolbar>
          <IonTitle>TO DO :)</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>

        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">TO DO :)</IonTitle>
          </IonToolbar>
        </IonHeader>
      </IonContent>
    </IonPage>
  );
}, () => true);

export default Tab2;
