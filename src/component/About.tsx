import React from 'react'

const template = (props: { }) => {
  return (
    <div>
      <p>テストページ</p>
    </div>
  )
}

const About = React.memo(template)

export default About
