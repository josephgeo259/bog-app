
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import axios from 'axios'
import NewCreatureForm from './NewCreatureForm'
 
class Creatures extends Component {
    state = {
        creatures: [],
    }
    componentWillMount() {
        this.getAllCreatures()
    }

    getAllCreatures = async () => {
        const res = await axios.get('/api/creatures')
        this.setState({ creatures: res.data })
    }

    toggleShowNewForm = () => {
    this.setState({ showNewForm: !this.state.showNewForm })
}
    render() {
        return (
            <div>
                <h1>Welcome to The Bog</h1>
                {this.state.creatures.map(creature => (
                    <Link key={creature._id} to={`/${creature._id}`}>
                        <h3>Name: {creature.name}</h3>
                        <p>Description: {creature.description}</p>
                    </Link>
                ))}
                <button onClick={this.toggleShowNewForm}>Create New</button>
                {this.state.showNewForm ? <NewCreatureForm getAllCreatures={this.getAllCreatures} /> : null}

            </div>
        )
    }
}

export default Creatures