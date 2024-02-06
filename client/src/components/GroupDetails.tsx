import '../css/GroupDetails.css';
import logo from '../assets/otter-logo.svg';

type groupProps = { group: { title: string; description: string } };

const GroupDetails = (group: groupProps) => {
  return (
    <div className='GroupDetails'>
      <img className='login-logo group-img' src={logo} alt='logo' />
      <div className='group-details'>
        <div className='group-name'>{group.group.title}</div>
        <div className='group-description'>{group.group.description}</div>
      </div>
    </div>
  );
};

export default GroupDetails;
