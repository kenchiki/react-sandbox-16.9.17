import React from 'react'

const template = (props: { }) => {
  return (
    <div>
      <p>ペットが入ります</p>
    </div>
  )
}

const Pet = React.memo(template)

export default Pet
