interface MessageProps {
    aussage : string ,
    color ?: string
}
 
function Message({aussage , color} : MessageProps){
    return ( 
        <>
            <h1 style={{color : color}} >{aussage}</h1>
        </>
     );
}
export function message( aussage : string) {
    return ( <span style={{fontFamily : "chiller"}}>{aussage}</span> );
}

export default Message;
 
