import axios from '../../../axios';
import React, { Component } from 'react'
import FullPost from '../FullPost/FullPost';
import Post from '../../../components/Post/Post'; 
import { Route } from 'react-router-dom';

import './Posts.css'


class Posts extends Component {
    state = {
        posts: []
    }

    componentDidMount () {
        axios.get('/posts')
        .then(response => {
            const posts = response.data.slice(0, 4);
            const updatePosts = posts.map(post => {
                return {
                    ...post,
                    author: 'Max'
                }
            })
            this.setState({posts: updatePosts});
        })
        .catch(error => {
            console.log(error);
            // this.setState({error: true})
        })

    }
    

    postSelectedHandler = (id) => {
        this.props.history.push({pathname: '/posts/' + id})
        // this.porps.history.push('/posts/' + id)
}


    render () {
        let posts = <p style={{textAlign: 'center'}}>Something went Wrong</p>
        if (!this.state.error){
            posts = this.state.posts.map(post =>{
                return (
                // <Link to={"/posts/" + post.id} key={post.id} >
                    <Post 
                        key={post.id} 
                        title={post.title} 
                        author={post.author}
                        // {...this.props}
                        // match = {this.props.match}
                        clicked={() => this.postSelectedHandler(post.id)}
                    />
                // </Link>
                )
            })
        }
        return (
            <div>
            <section className="Posts">
                    {posts}
                </section>
                <Route exact path={this.props.match.url + '/:id'} component={FullPost}/>
            </div>
        )
    }
}

export default Posts