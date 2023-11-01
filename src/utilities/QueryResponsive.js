import { useMediaQuery } from 'react-responsive'

const QueryResponsive =()=>{
    return {
        lg:useMediaQuery({ query: '(min-width: 1000px)' }),
        md:useMediaQuery({ query: '(max-width: 999px)' }),
        sm:useMediaQuery({ query: '(min-width: 800px)' })
    }}


export default QueryResponsive