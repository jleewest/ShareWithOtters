type groupProps = { group: { title: string; description: string } };

const GroupDetails = (group: groupProps) => {
  return (
    <div
      className='GroupDetails'
      style={{ border: '1px solid red', margin: '1rem' }}
    >
      <div>{group.group.title}</div>
      <div>{group.group.description}</div>
    </div>
  );
};

export default GroupDetails;
