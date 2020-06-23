import React from 'react'
import { Comment, Avatar, Form, List, Input } from 'antd'
import Button from '@material-ui/core/Button'
import { getOneProperty, postComment, getProfile, deleteComment } from '../../lib/api'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'
const { TextArea } = Input

const CommentList = ({ comments,user,handleDelete }) => (

  <List
    handleDelete = {handleDelete}
    className="comment-list"
    header={`${comments.length} Comments`}
    itemLayout="horizontal"
    dataSource={comments}
    renderItem={item => (
      <li>
        
        <Comment
          author={item.owner.username}
          avatar={item.owner.profile_image}
          content={item.owner.id === user.id ? <span key="comment-nested-reply-to"> {item.content}<HighlightOffIcon className='watch-buttons' onClick={()=>{
            handleDelete(item.id)
          }} style={{ fontSize: 'small', marginLeft: '15px', fill: 'red' }} /></span> : item.content}
          datetime={item.created_at}
        />
        
      </li>
    )}
  />
)

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button htmlType="submit"  variant="contained" loading={submitting} onClick={onSubmit} type="primary" color="primary">
        Add Comment
      </Button>
    </Form.Item>
  </>
)

class NewComment extends React.Component {
  state = {
    user: null,
    comments: [],
    submitting: false,
    newComment: {
      content: ''
    }
  };

  async componentDidMount(){
    const propertyId = this.props.propertyId
    try {
      const res = await getOneProperty(propertyId)
      const userRes = await getProfile()
      const commentsFormatted = res.data.property.comments.map(comment => {
        const date = new Date(comment.created_at)
        comment.created_at = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
        return comment
      })
      this.setState({
        user: userRes.data,
        comments: commentsFormatted
      })
    } catch (err){
      console.log(err)
    }
  }


  handleSubmit = () => {
    if (!this.state.newComment.content) {
      return
    }
    this.setState({
      submitting: true
    })
    setTimeout(async() => {
      const propertyId = this.props.propertyId
      try {
        const res = await postComment(propertyId,this.state.newComment)
        const CommentsRes = await getOneProperty(propertyId)
        const commentsFormatted = CommentsRes.data.property.comments.map(comment => {
          const date = new Date(comment.created_at)
          comment.created_at = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
          return comment
        })
        console.log(res.data)
        this.setState({
          comments: commentsFormatted,
          submitting: false,
          newComment: {
            content: ''
          }
        })
      } catch (err){
        console.log(err)
      }
    }, 1000)
  };

  handleChange = ({ target }) => {
    
    this.setState({
      newComment: {
        content: target.value
      }
    })
  };

  handleDelete = async(commentId) => {
    const propertyId = this.props.propertyId
    try {
      await deleteComment(commentId)
      const CommentsRes = await getOneProperty(propertyId)
      const commentsFormatted = CommentsRes.data.property.comments.map(comment => {
        const date = new Date(comment.created_at)
        comment.created_at = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
        return comment
      })
      this.setState({
        comments: commentsFormatted,
        submitting: false,
        newComment: {
          content: ''
        }
      })
    } catch (err){
      console.log(err)
    }
  }

  render() {
    const { comments, submitting, newComment,user } = this.state

    return (
      <>
        {comments.length > 0 && <CommentList handleDelete={this.handleDelete} comments={comments} user={user} />}
        <Comment
          avatar={
            <Avatar
              src={user ? user.profile_image : ''}
              alt={user ? user.username : ''}
            />
          }
          content={
            <Editor
              onChange={this.handleChange}
              onSubmit={this.handleSubmit}
              submitting={submitting}
              value={newComment.content}
            />
          }
        />
      </>
    )
  }
}

export default NewComment