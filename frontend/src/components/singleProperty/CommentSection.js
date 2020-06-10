import React from 'react'
import { Comment, Avatar, Form, Button, List, Input } from 'antd'
import moment from 'moment'
import { getOneProperty, postComment, getProfile } from '../../lib/api'

const { TextArea } = Input

const CommentList = ({ comments }) => (
  <List
    className="comment-list"
    header={`${comments.length} Comments`}
    itemLayout="horizontal"
    dataSource={comments}
    renderItem={item => (
      <li>
        <Comment
          actions={item.actions}
          author={item.owner.username}
          avatar={item.owner.profile_image}
          content={item.content}
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
      <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
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
      this.setState({
        user: userRes.data,
        comments: res.data.property.comments
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
        console.log(res.data)
        this.setState({
          comments: CommentsRes.data.property.comments,
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

  render() {
    const { comments, submitting, newComment,user } = this.state

    return (
      <>
        {comments.length > 0 && <CommentList comments={comments} />}
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