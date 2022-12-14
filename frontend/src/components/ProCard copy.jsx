import { IonAvatar,IonLabel, IonCardSubtitle, IonIcon, IonModal, IonNote, IonRow, useIonModal } from "@ionic/react";
import { bulb, micOutline, personOutline,starOutline } from "ionicons/icons";
import { useStoreState } from "pullstate";
import { useEffect, useState } from "react";

import { CategoryStore } from '../store';
import { getPeople } from "../store/PeopleStore";
import { getCategory } from '../store/Selectors';

import styles from "./ProCard.module.css";
import { TalkModal } from "./TalkModal";

export const ProCard = ({ upcoming = false, talk, pageRef }) => {

	const talkCategory = useStoreState(CategoryStore, getCategory(talk.category_id));
  const [ speakers, setSpeakers ] = useState([]);
  const [ showModal, setShowModal ] = useState(false);

  useEffect(() => {

    setSpeakers(getPeople(talk.speakers));
  }, [ talk ]);

  // const [ present, dismiss ] = useIonModal(TalkModal, {

  //   dismiss: () => dismiss(),
  //   talk,
  //   speakers,
  //   category: talkCategory
  // });

	// const handleShowTalk = () => {

  //   console.log("in here");

	// 	present({
	
	// 	  // presentingElement: pageRef.current
	// 	});
	// }

	return (
    <>
      <div className={ `${ styles.talkCard } ${ upcoming && styles.upcomingCard }` } onClick={ () => setShowModal(true) }>

       <div className={ styles.proDetails }> 
          <IonAvatar >
            <img src="https://i.pravatar.cc/300" />
          </IonAvatar>

          <div className={ styles.talkTitle }>
            <h3>{ talk.title }</h3>
            <div className={ styles.cardTitle }>
              <IonIcon color={ upcoming ? "primary" : "white" } icon={ bulb } />
              <IonCardSubtitle color={ upcoming ? "light" : "primary" }>{ talkCategory.name } talks</IonCardSubtitle>
            </div>
            <IonCardSubtitle>{ talk.description }</IonCardSubtitle>

          </div>
        
        
        </div>
       
        

        { upcoming && 
          <div className={ styles.talkDate }>
            <IonNote color="secondary">{ talk.time }</IonNote>
            <div className={ styles.detailCount }>
              <IonIcon icon={ micOutline } color="light " />
              <span>{ talk.speakers } Speakers</span>
            </div>
          </div>
        }

        { !upcoming && 
          
          <div className={ styles.talkDetails }>
            <div className={ styles.detailCount }>
              <IonIcon icon={ personOutline } color="primary" />
              <span>{ talk.speakers } Calls</span>
            </div>
            <div className={ styles.detailCount }>
              <IonIcon icon={ micOutline } color="primary" />
              <span>{ talk.speakers }+ Hours</span>
            </div>
            <div className={ styles.detailCount }>
              <IonIcon icon={ starOutline } color="primary" />
              <span>{ talk.speakers } ({talk.audience} Ratings)</span>
            </div>
 
          </div>
        }
      </div>

      <IonModal isOpen={ showModal } onDidDismiss={ () => setShowModal(false) } presentingElement={ pageRef.current }>
        <TalkModal dismiss={ () => setShowModal(false) } speakers={ speakers } talk={ talk } category={ talkCategory } />
      </IonModal>
    </>
	);
}