import img from '../resources/img/AvengersError.webp'

const ServicesError = () => {
    return <div style={{ height: "100%", width: '100%',position:'relative' }}>
        <img src={img} alt="" style={{ height: "100%" }} />
        <p style={{ position:'absolute', bottom:'50%',right:'5%',fontSize:30,fontWeight:'bolder' }}>404 Not Found</p>
    </div>
}

export default ServicesError