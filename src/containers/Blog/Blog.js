import { Route, NavLink, Switch } from 'react-router-dom';
// import FullPost from './FullPost/FullPost';
import React, { Component } from 'react';
// import NewPost from './NewPost/NewPost';
import Posts from './Posts/Posts';
import asyncComponent from '../../hoc/asyncComponent';
import './Blog.css';


const AsyncNewPost = asyncComponent(() => {
    return import('./NewPost/NewPost');
})

class Blog extends Component {
    state= {
        auth: false
    }
    render () {
        return (
            <div className="Blog">
                <header >
                    <nav>
                        <ul>
                            <li><NavLink to="/posts/" exact activeClassName="my-active" activeStyle={{color: '#fa923f', textDecoration: 'underline' }}>Home</NavLink></li>
                            <li><NavLink to="/new-post" >New Post</NavLink></li>
                        </ul>
                    </nav>
                </header>
                {/* <Route exact path="/" render={() => <h1>Home</h1>}/> */}
                <Switch>
                    {this.state.auth ? <Route path="/new-post" component={AsyncNewPost}/> : null}
                    <Route path="/posts" component={Posts}/>
                    <Route render={() => <h1>Not Found</h1>}/>
                    {/* <Redirect from="/" to="/posts" /> */}
                </Switch>
            </div>
        );
    }
}

export default Blog;