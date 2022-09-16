import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { memo } from 'react';
import './Tab3.css';

const Tab3 = memo(() => {
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

export default Tab3;
