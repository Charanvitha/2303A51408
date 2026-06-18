import React, { useState, useEffect } from 'react';
import { 
  Container, Typography, Box, Tabs, Tab, Card, CardContent, 
  Chip, Pagination, FormControl, InputLabel, Select, MenuItem, Stack, Paper
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';

const WEIGHTS = { "Placement": 3, "Result": 2, "Event": 1 };

const stableNotificationsData = [
  { "ID": "b283218f-ea5a-4b7c-93a9-1f2f240d64b0", "Type": "Placement", "Message": "CSX Corporation hiring drive open for registration", "Timestamp": "2026-04-22 17:51:18" },
  { "ID": "8a7412bd-6065-4d09-8501-a37f11cc848b", "Type": "Placement", "Message": "Advanced Micro Devices Inc. off-campus hiring application", "Timestamp": "2026-04-22 17:49:42" },
  { "ID": "d146095a-0d86-4a34-9e69-3900a14576bc", "Type": "Result", "Message": "Mid-Semester examination results published online", "Timestamp": "2026-04-22 17:51:30" },
  { "ID": "0005513a-142b-4bbc-8678-eefec65e1ede", "Type": "Result", "Message": "Re-evaluation status updates for semester examinations", "Timestamp": "2026-04-22 17:50:54" },
  { "ID": "ea836726-c25e-4f21-a72f-544a6af8a37f", "Type": "Result", "Message": "B.Tech Final Year project review panel schedules uploaded", "Timestamp": "2026-04-22 17:50:42" },
  { "ID": "003cb427-8fc6-47f7-bb00-be228f6b0d2c", "Type": "Result", "Message": "External lab examination evaluation matrix sheet", "Timestamp": "2026-04-22 17:50:30" },
  { "ID": "81589ada-0ad3-4f77-9554-f52fb558e09d", "Type": "Event", "Message": "Final Year batch farewell party registration link", "Timestamp": "2026-04-22 17:51:06" },
  { "ID": "1cfce5ee-ad37-4894-8946-d707627176a5", "Type": "Event", "Message": "National Level Tech-Fest core committee registrations", "Timestamp": "2026-04-22 17:50:06" }
];

export default function App() {
  const [tabIndex, setTabIndex] = useState(0); 
  const [notifications, setNotifications] = useState(stableNotificationsData);
  const [readIds, setReadIds] = useState([]);
  const [page, setPage] = useState(1);
  const [filterType, setFilterType] = useState('');

 
  useEffect(() => {
    const fetchLiveUpdates = async () => {
      try {
        const url = `http://4.224.186.213/evaluation-service/notifications?page=${page}&limit=10&notification_type=${filterType}`;
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Authorization': 'bDreAq',
            'Content-Type': 'application/json'
          }
        });
        if (response.ok) {
          const data = await response.json();
          if (data.notifications) setNotifications(data.notifications);
        }
      } catch (err) {
       
      }
    };
    fetchLiveUpdates();
  }, [page, filterType]);

 
  const getSortedPriorityInbox = (items) => {
    return [...items].sort((a, b) => {
      if (WEIGHTS[a.Type] !== WEIGHTS[b.Type]) {
        return WEIGHTS[b.Type] - WEIGHTS[a.Type]; 
      }
      return new Date(b.Timestamp) - new Date(a.Timestamp); 
    });
  };

  const handleNotificationClick = (id) => {
    if (!readIds.includes(id)) {
      setReadIds([...readIds, id]);
    }
  };


  const filteredNotifications = filterType 
    ? notifications.filter(item => item.Type === filterType)
    : notifications;

  const displayedItems = tabIndex === 0 
    ? filteredNotifications 
    : getSortedPriorityInbox(filteredNotifications);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f4f6f9', py: 4 }}>
      <Container maxWidth="md">
        
        {/* Main Header Card Block */}
        <Paper elevation={0} sx={{ p: 3, mb: 4, borderRadius: 3, bgcolor: '#ffffff', border: '1px solid #e0e0e0' }}>
          <Box display="flex" alignItems="center" gap={2}>
            <Box sx={{ bgcolor: '#e3f2fd', p: 1.5, borderRadius: 2, display: 'flex', alignItems: 'center' }}>
              <NotificationsIcon sx={{ color: '#1976d2', fontSize: 32 }} />
            </Box>
            <Box>
              <Typography variant="h4" component="h1" fontWeight="800" sx={{ color: '#0d47a1', letterSpacing: '-0.5px' }}>
                Campus Notification Hub
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Stay updated with real-time placements, exam results, and events
              </Typography>
            </Box>
          </Box>
        </Paper>

        {/* Dark Control Navigation Action Panel */}
        <Paper sx={{ bgcolor: '#0d47a1', borderRadius: 3, p: 1.5, mb: 4, boxShadow: '0px 4px 20px rgba(13, 71, 161, 0.25)' }}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="space-between" alignItems="center">
            
            {/* White Priority Tabs Setup */}
            <Tabs 
              value={tabIndex} 
              onChange={(e, value) => setTabIndex(value)} 
              TabIndicatorProps={{ style: { backgroundColor: '#ffffff', height: '3px', borderRadius: '3px' } }}
            >
              <Tab 
                label="All Notifications" 
                sx={{ color: 'rgba(255, 255, 255, 0.7)', '&.Mui-selected': { color: '#ffffff' }, fontWeight: '700', textTransform: 'none', fontSize: '0.95rem' }} 
              />
              <Tab 
                icon={<PriorityHighIcon fontSize="small" sx={{ color: 'inherit' }} />} 
                iconPosition="start" 
                label="Priority Inbox" 
                sx={{ color: 'rgba(255, 255, 255, 0.7)', '&.Mui-selected': { color: '#ffffff' }, fontWeight: '700', textTransform: 'none', fontSize: '0.95rem' }} 
              />
            </Tabs>

            {/* White Filter Box Component Layout (Only shows on the main tab) */}
            {tabIndex === 0 && (
              <FormControl size="small" sx={{ minWidth: 200 }}>
                <InputLabel sx={{ color: '#ffffff', '&.Mui-focused': { color: '#ffffff' }, fontSize: '0.9rem', fontWeight: '500' }}>
                  Filter by Category
                </InputLabel>
                <Select
                  value={filterType}
                  label="Filter by Category"
                  onChange={(e) => { setFilterType(e.target.value); setPage(1); }}
                  sx={{
                    color: '#ffffff',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    '.MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255, 255, 255, 0.4)', borderRadius: '10px' },
                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#ffffff' },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#ffffff' },
                    '.MuiSvgIcon-root': { color: '#ffffff' }
                  }}
                >
                  <MenuItem value=""><em>Show All Categories</em></MenuItem>
                  <MenuItem value="Placement">Placement Drive</MenuItem>
                  <MenuItem value="Result">Exam Results</MenuItem>
                  <MenuItem value="Event">Campus Events</MenuItem>
                </Select>
              </FormControl>
            )}
          </Stack>
        </Paper>

        {/* Card Element Lists Component Container */}
        <Box minHeight="360px">
          {displayedItems.map((item) => {
            const isRead = readIds.includes(item.ID);
            return (
              <Card 
                key={item.ID} 
                onClick={() => handleNotificationClick(item.ID)}
                sx={{ 
                  mb: 2, 
                  cursor: 'pointer',
                  borderRadius: 2.5,
                  borderLeft: isRead ? '6px solid #90a4ae' : '6px solid #1976d2',
                  backgroundColor: isRead ? '#f8f9fa' : '#ffffff',
                  boxShadow: isRead ? '0px 2px 4px rgba(0,0,0,0.02)' : '0px 4px 12px rgba(0,0,0,0.05)',
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': { boxShadow: '0px 6px 16px rgba(0,0,0,0.1)', transform: 'translateY(-1px)' }
                }}
              >
                <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: '20px !important' }}>
                  <Box sx={{ flex: 1, pr: 2 }}>
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        fontWeight: isRead ? '500' : '700', 
                        color: isRead ? 'text.secondary' : '#2c3e50',
                        fontSize: '1.05rem',
                        lineHeight: '1.4'
                      }}
                    >
                      {item.Message}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mt: 0.5, fontWeight: '500' }}>
                      {item.Timestamp}
                    </Typography>
                  </Box>
                  <Chip 
                    label={item.Type} 
                    size="small"
                    sx={{ 
                      fontWeight: '700', 
                      px: 1,
                      fontSize: '0.75rem',
                      borderRadius: '6px'
                    }}
                    color={item.Type === "Placement" ? "error" : item.Type === "Result" ? "success" : "warning"} 
                  />
                </CardContent>
              </Card>
            );
          })}
        </Box>

        {/* Pagination Footer Elements Layout with White Font & Dark Background */}
        {tabIndex === 0 && (
          <Box display="flex" justifyContent="center" mt={5}>
            <Paper 
              elevation={2} 
              sx={{ 
                p: 1, 
                borderRadius: '50px', 
                bgcolor: '#0d47a1', // Match the professional dark blue navigation theme
              }}
            >
              <Pagination 
                count={3} 
                page={page} 
                onChange={(e, val) => setPage(val)} 
                sx={{
                  '& .MuiPaginationItem-root': {
                    color: 'rgba(255, 255, 255, 0.7)', 
                    fontWeight: '700',
                    '&:hover': {
                      bgcolor: 'rgba(255, 255, 255, 0.2)', 
                      color: '#ffffff'
                    },
                    '&.Mui-selected': {
                      bgcolor: '#ffffff', 
                      color: '#0d47a1', 
                      '&:hover': {
                        bgcolor: '#ffffff'
                      }
                    }
                  },
                  '& .MuiPaginationItem-icon': {
                    color: '#ffffff' 
                  }
                }}
              />
            </Paper>
          </Box>
        )}
      </Container>
    </Box>
  );
}