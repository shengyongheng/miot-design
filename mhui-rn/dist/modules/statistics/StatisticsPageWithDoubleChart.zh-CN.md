```jsx
 <StatisticsPageWithDoubleChart
          topicTitle="用电详情"
          panelConfig={{
            data: [{
              value: 1.5,
              name: '当前功率（瓦）',
              valueColor: '#3CB3F7',
            },
            {
              value: 0.3,
              name: '今日用电（度）',
            },
            {
              value: 1.5,
              name: '当前功率（瓦）',
            },
            {
              value: '-',
              name: '今日用电（度）',
            },
            {
              value: 1.5,
              name: '今日开启时长（时:分）',
            },
            // {
            //   value: 0.3,
            //   name: '今日用电（度）',
            // }
            ],
          }}
          onSelectChange={() => {
            setStatus(!status);
          }}
          selectConfig={{
            initialOptionIndex: 0,
            initialValue: '按日显示',
            onSelectChange: (idx) => {
              console.log(idx);
            },
            options: [
              { title: '按周显示' }, { title: '按日显示' }, { title: '按月显示' }
            ]
          }}
          barTitleConfig={{
            leftTitle: "20",
            leftSubtitle: "用电量",
            rightSubtitle: "使用时长",
            rightTitle: ['123', '6'],
            leftUnits: "度",
            rightUnits: ['小时', '分钟'],
          }}
          barChartConfig={
            {
              barRawFill: "rgba(60,179,247, 0.3)",
              barSelectedFill: "#3CB3F7",
            }
          }
          initialOptionIndex={0}
          initialValue="xxx"
          barChartDataset={status ? b : rb}


          lineChartDataset={status ? b : rb}
          lineChartTitle={'功率'}
        />
```
