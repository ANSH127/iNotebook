import React from 'react'

export default function Alert(props) {
    const capitalize=(word)=>{
        if(word==='danger'){word='error'}
        const lower=word.toLowerCase();
        return lower.charAt(0).toUpperCase()+lower.slice(1);
    }
  return (
    
        <div style={{height:'50px'}}>

        <div className={`alert alert-${props.alert===null?'':props.alert.type} alert-dismissible fade show`} role="alert">
        <strong>{capitalize(props.alert===null?'':props.alert.type)}</strong> {props.alert===null?'':':'+props.alert.msg}
        </div>
        </div>
    
  )
}
