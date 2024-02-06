import '../css/GroupDetails.css';
import logo from '../assets/otter-logo.svg';

type Group = { title: string; description: string };

type GroupDetailsProps = { group: Group };

export const GroupDetails: React.FC<GroupDetailsProps> = (props) => {
  return (
    <div className='GroupDetails'>
      <img className='login-logo group-img' src={logo} alt='logo' />
      <div className='group-details'>
        <div className='group-name'>{props.group.title}</div>
        <div className='group-description'>{props.group.description}</div>
      </div>
    </div>
  );
};
