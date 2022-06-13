import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Button, Form, Input } from 'semantic-ui-react';
import { ConnectionStringParser } from "connection-string-parser";

const Settings = () => {
  const [Settings, setSettings] = useState(null);
  
  useEffect(() => {
    axios.get("./settings").then(({ data }) => {
      console.log(data, "adf");
      setSettings(data)
    })
  }, [])
  
  return (
    <div>
      {!Settings && "loading..... "}
      {Settings &&
        <Form>
          
          <Form.Field>
            <label>Connection String</label>
            <input onChange={({target:{value}})=>{
              setSettings(_=>({..._,DATABASE_URL:value}))
            }} value={Settings.DATABASE_URL} placeholder='Connection String' />
          
          </Form.Field>
          <Form.Field>
            <label>JWT Token</label>
            <input onChange={({target:{value}})=>{
              setSettings(_=>({..._,tokenkey:value}))
            }} value={Settings.tokenkey} placeholder='JWT Token' />
          
          </Form.Field>
          <Button
          
          onClick={()=>{
            console.log();
            axios.post("/settings",{a:"a",Settings}).then(e=>{
              console.log(e);
            })
          }}
          >
            Submit And Validate
          </Button>
        </Form>

      }
    </div>
  );
}

export default Settings;
