import EventCard from '../components/EventCard'

const Home = () => {
    return (
        <div>
            <h1>Home</h1>
            <EventCard eventID='1' eventDescription='great event must come' eventName='event1' eventImg='https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Example_image.svg/600px-Example_image.svg.png' />
        </div>
    )
}

export default Home