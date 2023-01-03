import { Helmet } from "react-helmet-async";

interface HelmetProps{
    title : string ,
    content ?: string
}
function Header({title , content} : HelmetProps) {
    return ( 
        <>
            <Helmet>
                <title>{title}</title>
                <meta name="description" content={content} />
            </Helmet>
        </>
     );
}

export default Header;