import React, { forwardRef, useRef, useEffect, useImperativeHandle } from 'react';
import Expert from '../components/Expert';
import { tools, avatar } from './constants';

const ResearchAnalyst = forwardRef(({
    id="analyst",
    name="Felipe",  // used for the displayed personality of the expert and maybe memory
    age=37,  // used for the displayed personality of the expert
    gender="male", // used for the displayed personality of the expert
    task="", // specific task for this expert instance
    style,
    onAnimationEnd,
    study=[],
}, ref) => {
    const expertRef = useRef(); 

    const meta = {
        type: 'expert',
        name,
        age,
        role: 'Research Analyst',
        goal: `Analyze the company website and provided description to extract insights on culture, values, and specific needs.`,
        backstory: `# Expert in analyzing company cultures and identifying key values and needs 
        from various sources, including websites and brief descriptions.
        # You cannot send emails to the client nor call them to ask for more information, so based all your responses on what you can find online and from your peers.`,
        // how the experts talks back to the user like in the meeting
        personality: `Always use 'I' instead of 'You', use easy to understand terms, don't use exagerated words, and be straightfoward on the tasks you are going to perform. Instead of saying you will perform in the future, say you are doing it now.`, 
        collaborate: true,
        avatar: {
            // dark blue color hex: #
            bgColor: '#1F286A',
            // darker brown color hex: #5C4033
            hairColor: '#331800', 
            shirtColor: '#606080', //#1F286A
            skinColor: avatar.skinColor.pale,
            glassesStyle: avatar.glassesStyle.square,
            facialHairStyle: avatar.facialHairStyle.scruff,
            hairStyle: avatar.hairStyle.turban,
            earSize: avatar.earSize.medium
        },
        tools: { // defines animations and which tools are available for this expert
            [tools.search]: { 'searching':'Searching websites for more information.' },
            [tools.query_visual_website]: { 'camera': 'Querying webpage visually ..' },
            [tools.scrape]: { 'reading': 'Reading the contents ..' },
            [tools.website_search]: { 'webpage': 'Reading the contents ..' }, 
            [tools.pdf_reader]: { 'reading': 'Reading PDF contents ..' },
            [tools.youtube_video_search]: { 'reading': 'Analyzing youtube video ..' },
        },
        study: study
    };
    if (task !== "") {
        meta.backstory += `. Your current main task is to '${task}'`;
    }

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
        getIDx: ()=>id
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

export default ResearchAnalyst;
