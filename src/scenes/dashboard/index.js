import React, {useEffect} from "react";
import { Card,CardContent, Grid, Box, Stack, Avatar, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { CreateBar } from "components/Charts/CreateBar";
import { CreateLine } from "components/Charts/CreateLine";
import { CreateDoughnut } from "components/Charts/CreateDoughnut";
import { CreatePie } from "components/Charts/CreatePie";
import { earningData, weeklyStats } from "data";

const Dashboard = () => {
  const theme = useTheme();

  return <div>
    <Box sx={{display: 'flex', flexDirection:'column'}}>
      {/* ROW1 */}
      <Box sx={{display:'flex', justifyContent:'space-between',width:'97%', m:2}}>
        <Box sx={{display:'flex', width:'30%'}}>
          <div style={{backgroundColor: theme.palette.primary.main, borderRadius:3, padding: 10, width:'22vw', display:'flex',flexDirection:'row', justifyContent:'space-evenly', paddingTop: 25}}>
            <div style={{display: 'flex', flexDirection:'column', justifyContent:'space-evenly'}}>
            <Typography variant="h3">Earnings</Typography>
            <Typography variant="h2">$63,448.78</Typography>
            </div>
            <div style={{alignItems: 'flex-start', display:'flex'}}>
            <Avatar>
              <MonetizationOnIcon/>
            </Avatar>
            </div>
          </div>
        </Box>
        <Box sx={{flexDirection:'row', display:'flex', width: '70%', justifyContent: 'space-between'}}>
        {earningData.map((item) => (
            <div 
            key={item.title}
            style={{backgroundColor: theme.palette.primary.main, borderRadius:3, padding:10, display:"flex", flexDirection:'column', width:'13vw'}}
            >
                <Avatar>
                {item.icon}
                </Avatar>
              <p>
                <span>{item.amount} </span>
                <span>
                  {item.percentage}
                </span>
              </p>
              <p>{item.title}</p>
            </div>
          ))}
        </Box>
      </Box>
      {/* ROW2 */}
      <Box sx={{display:'flex', justifyContent:'space-between', width:'97%', borderRadius:3, m:2}}>
      <Box sx={{display:'flex', width:'63%', bgcolor: theme.palette.primary.main, borderRadius:3}}>
        <Box sx={{display:'flex', width:'100%', alignItems: 'center'}}> 
          <CreateLine />
        </Box>
      </Box>
      <Box sx={{display:'flex', width:'35%', bgcolor: theme.palette.primary.main, borderRadius:3}}>
        <Box sx={{display:'flex', width:'100%', justifyContent: 'center'}}> 
        <CreatePie />
        </Box>
      </Box>
      </Box>
      {/* ROW3 */}
      <Box sx={{display:'flex', justifyContent:'space-between', width:'97%', m:2}}>
        <Box sx={{display:'flex', width:'25%',bgcolor: theme.palette.primary.main, borderRadius:3, p:2}}>
        <div style={{width:'100%'}}>
          <div>
            <Typography variant="h4">Weekly Stats</Typography>
          </div>

          <div>
            {weeklyStats.map((item) => (
              <div key={item.title} style={{display:'flex', justifyContent:'space-between', width:'100%'}} >
                <div style={{display:'flex', alignItems:'center'}}>
                  <Avatar
                    sx={{ background: item.iconBg }}
                  >
                    {item.icon}
                  </Avatar>
                  <div>
                    <p>{item.title}</p>
                    <p>{item.desc}</p>
                  </div>
                </div>

                <p>{item.amount}</p>
              </div>
            ))}
          </div>
        </div>
        </Box>
        <Box sx={{display:'flex', justifyContent: 'space-evenly', alignItems:'center',width:'72%', bgcolor: theme.palette.primary.main, borderRadius:3}}>
          <Box sx={{display:'flex', width:'30%'}}>
            <CreateDoughnut />
          </Box>
          <Box sx={{display:'flex', width:'60%'}}> 
            <CreateBar />
          </Box>
        </Box>
      </Box>
    </Box>
  </div>;
};

export default Dashboard;
