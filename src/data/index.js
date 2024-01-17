import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import AllInboxIcon from '@mui/icons-material/AllInbox';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import LoopIcon from '@mui/icons-material/Loop';
import LocalGroceryStoreOutlinedIcon from '@mui/icons-material/LocalGroceryStoreOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';

export const earningData = [
    {
      icon: <SupervisorAccountIcon />,
      amount: '39,354',
      percentage: '-4%',
      title: 'Customers',
      iconColor: '#03C9D7',
      iconBg: '#E5FAFB',
      pcColor: 'red-600',
    },
    {
      icon: <AllInboxIcon />,
      amount: '4,396',
      percentage: '+23%',
      title: 'Products',
      iconColor: 'rgb(255, 244, 229)',
      iconBg: 'rgb(254, 201, 15)',
      pcColor: 'green-600',
    },
    {
      icon: <SignalCellularAltIcon />,
      amount: '423,39',
      percentage: '+38%',
      title: 'Sales',
      iconColor: 'rgb(228, 106, 118)',
      iconBg: 'rgb(255, 244, 229)',
  
      pcColor: 'green-600',
    },
    {
      icon: <LoopIcon />,
      amount: '39,354',
      percentage: '-12%',
      title: 'Refunds',
      iconColor: 'rgb(0, 194, 146)',
      iconBg: 'rgb(235, 250, 242)',
      pcColor: 'red-600',
    },
  ];

  export const weeklyStats = [
    {
      icon: <LocalGroceryStoreOutlinedIcon />,
      amount: '-$560',
      title: 'Top Sales',
      desc: 'Johnathan Doe',
      iconBg: '#FB9678',
      pcColor: 'red-600',
    },
    {
      icon: <StarBorderOutlinedIcon />,
      amount: '-$560',
      title: 'Best Seller',
      desc: 'MaterialPro Admin',
      iconBg: 'rgb(254, 201, 15)',
      pcColor: 'red-600',
    },
    {
      icon: <ChatBubbleOutlineOutlinedIcon />,
      amount: '+$560',
      title: 'Most Commented',
      desc: 'Ample Admin',
      iconBg: '#00C292',
      pcColor: 'green-600',
    },
  ];