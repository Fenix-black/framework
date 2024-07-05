import React, { useRef, useState, useEffect } from 'react';
import { WiredCard, WiredButton, WiredInput } from 'react-wired-elements';
//import { brandSchema, brochureSchema, privacyPolicy } from '../schemas';

import Meeting from '../components/Meeting';
import AccountManager from '../experts/AccountManager';
import Stakeholder from '../experts/Stakeholder';
import Designer from '../experts/Designer';

function CreateNewWebPage() {
    const createWebsite = useRef(null); 
    const [testTask, setTestTask] = useState('Create a 3 page website for a real state Property Company, based in Santiago, Chile, specialized in selling beach houses in the coast of the country.');
    const [inMeeting, setInMeeting] = useState(false);
    const [visible, setVisible] = useState(true);
    const [dialog, setDialog] = useState([]);
    return (
        <>
        <WiredInput 
          placeholder="Test Task" 
          value={testTask}
          style={{width:'50%'}} 
          onChange={(e)=>setTestTask(e.target.value)} />
        <WiredButton 
          style={{marginTop:20, color:'yellowgreen' }}
          disabled={inMeeting}
          onClick={async()=>{ 
            await createWebsite.current.start(
                testTask,
                null
            ); 
            setInMeeting(true); 
          }}
        >Start Meeting</WiredButton>
        <Meeting 
          name="createWebsite" 
          ref={createWebsite} 
          task="research the best approach for creating a given website, its design, and the content that should be included in it so that a team of developers can start working on it after this meeting. Collect all questions you may have about the website and its content and after researching the info on the internet, call the user to ask for the missing information to have a more complete final report." 
          hidden={false} 
          //rules={['/rules/base.txt']}
          onDialog={(dialog)=>setDialog(dialog)} //transcription
          onFinish={(output)=>{
            console.log('meeting onFinish called',output);
            setInMeeting(false);
          }}>
          <AccountManager name="Mauricio" />
          <Stakeholder user_name="Pablo" user_role="CEO" />
          <Designer study={[
            'https://rareformnewmedia.com/web-designers-guide-the-care-feeding-of-web-developers/',
            'https://www.wix.com/blog/7-principles-of-design-websites',
            'https://www.wix.com/blog/web-design-trends',
            'https://www.wix.com/blog/how-to-design-a-website',
            'https://assets.ctfassets.net/uha7v3hw004j/4FuCRjBFe4mtOBU236eNyZ/5bdbf5f91949a26138bf6d6c1ed23dcc/ColorPaletteGuide_2020_HighContrast.pdf',
          ]} />
        </Meeting>
        {visible===true && (
            <WiredCard elevation={2} style={{marginBottom:100, color:'white', textAlign:'left', width:'80%' }}>
                <h2>Meeting Transcription</h2>
                <span style={{ fontFamily:'sans-serif' }}>
                    {dialog && dialog.map((d,i)=><p key={i}>{d.full}</p>)}
                </span>
            </WiredCard>
        )}
        </>
    );
}

export default CreateNewWebPage;