import React, { Component } from 'react';

class ErrorBoundary extends Component {
    state = {
        hasError: false,
        errorMsg: ''
    }

    componentDidCatch = (error, info) => {
        this.setState({
            hasError: true,
            errorMsg: error
        });
    }
    render() {
        return (
            this.state.hasError
                ?
                <h1>Something went wrong</h1>
                :
                this.props.children
        );
    }
}

export default ErrorBoundary;