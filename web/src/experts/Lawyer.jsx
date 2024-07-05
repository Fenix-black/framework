import React, { forwardRef, useRef, useEffect, useImperativeHandle } from 'react';
import Expert from '../components/Expert';
import { tools, avatar } from './constants';

const Lawyer = forwardRef(({
    id="lawyer",
    name="Sean",
    age=44,
    gender="male",
    style,
    onAnimationEnd,
    study=[],
}, ref) => {
    const expertRef = useRef();

    const meta = {
        type: 'expert',
        name,
        age,
        role: 'Lawyer',
        goal: `Review legal documents and provide legal advice.`,
        backstory: `With a decade of experience in privacy law, Sean is an expert in data protection and privacy compliance.`,
        personality: `Analytical, detail-oriented, and a great communicator.`,
        collaborate: true,
        avatar: {
            // deep dark blue 
            bgColor: '#000030',
            hairColor: '#FF0000',
            shirtColor: '#FFFDD0',  
            skinColor: avatar.skinColor.light,
            earSize: avatar.earSize.small,  
            hairStyle: avatar.hairStyle.pixie,
            noseStyle: avatar.noseStyle.round,
            shirtStyle: avatar.shirtStyle.crew,
            facialHairStyle: avatar.facialHairStyle.none,
            glassesStyle: avatar.glassesStyle.square,
            eyebrowsStyle: avatar.eyebrowsStyle.eyelashesUp,
            speakSpeed: 200,
            blinkSpeed: 3000,
        },
        tools: { // defines animations and which tools are available for this expert
            [tools.search]: { 'searching':'Searching websites for more information.' },
            [tools.scrape]: { 'analyzing:#FFFFFF': 'Understanding the website ..' },
        },
        study: study
    };

    const setup = () => {
        // Example: set up expert based on AccountManager's props like age and gender
        if (expertRef.current) {
            //expertRef.current.setAge(age);
            //expertRef.current.setGender(gender);
        }
    };

    // Expose expert's methods to AccountManager's parent through ref
    useImperativeHandle(ref, () => ({
        // Inherit expert methods
        ...expertRef.current,
        // Custom methods
        other: ()=>{}
    }));

    useEffect(() => {
        setup(); // Set up expert when specialist is mounted
    }, []);

    return (
        <Expert
            ref={expertRef}
            id={id}
            meta={meta}
            name={name}            
            style={style}
            onSpeakEnd={onAnimationEnd}
            // other props that expert expects
        />
    );
});

export default Lawyer;
