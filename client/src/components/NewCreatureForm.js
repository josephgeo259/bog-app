import React, { Component } from 'react'
import axios from 'axios'

class NewCreatureForm extends Component {
    state = {
        name: '',
        description: ''
    }

    handleChange = (event) => {
        const name = event.target.name
        const newState = { ...this.state }
        newState[name] = event.target.value
        this.setState(newState)
    }

    handleSubmit = async (event) => {
        event.preventDefault()
        const payload = {
            name: this.state.name,
            description: this.state.description
        }
        await axios.post('/api/creatures', payload)
        await this.props.getAllCreatures()
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div>
                    <label htmlFor="name">Name: </label>
                    <input onChange={this.handleChange} type="text" name="name" value={this.state.name} />
                </div>
                <div>
                    <label htmlFor="description">Description: </label>
                    <input onChange={this.handleChange} type="text" name="description" value={this.state.description} />
                </div>
                <button>Submit</button>
            </form>
        )
    }
}

export default NewCreatureForm