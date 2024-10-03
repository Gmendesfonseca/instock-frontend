import './styles.css';
import React, { useEffect } from 'react';
import ApexCharts, { ApexOptions } from 'apexcharts';

declare global {
  interface Window {
    Apex: any;
  }
}

const Dashboard: React.FC = () => {
  useEffect(() => {
    window.Apex = {
      chart: {
        foreColor: '#ccc',
        toolbar: {
          show: false,
        },
      },
      stroke: {
        width: 3,
      },
      dataLabels: {
        enabled: false,
      },
      tooltip: {
        theme: 'dark',
      },
      grid: {
        borderColor: '#535A6C',
        xaxis: {
          lines: {
            show: true,
          },
        },
      },
    };

    const spark1 = {
      chart: {
        id: 'spark1',
        group: 'sparks',
        type: 'line',
        height: 80,
        sparkline: {
          enabled: true,
        },
        dropShadow: {
          enabled: true,
          top: 1,
          left: 1,
          blur: 2,
          opacity: 0.2,
        },
      },
      series: [
        {
          data: [25, 66, 41, 59, 25, 44, 12, 36, 9, 21],
        },
      ],
      stroke: {
        curve: 'smooth',
      },
      markers: {
        size: 0,
      },
      grid: {
        padding: {
          top: 20,
          bottom: 10,
          left: 110,
        },
      },
      colors: ['#fff'],
      tooltip: {
        x: {
          show: false,
        },
        y: {
          title: {
            formatter: () => '',
          },
        },
      },
    };

    const spark2 = {
      chart: {
        id: 'spark2',
        group: 'sparks',
        type: 'line',
        height: 80,
        sparkline: {
          enabled: true,
        },
        dropShadow: {
          enabled: true,
          top: 1,
          left: 1,
          blur: 2,
          opacity: 0.2,
        },
      },
      series: [
        {
          data: [12, 14, 2, 47, 32, 44, 14, 55, 41, 69],
        },
      ],
      stroke: {
        curve: 'smooth',
      },
      grid: {
        padding: {
          top: 20,
          bottom: 10,
          left: 110,
        },
      },
      markers: {
        size: 0,
      },
      colors: ['#fff'],
      tooltip: {
        x: {
          show: false,
        },
        y: {
          title: {
            formatter: () => '',
          },
        },
      },
    };

    const spark3 = {
      chart: {
        id: 'spark3',
        group: 'sparks',
        type: 'line',
        height: 80,
        sparkline: {
          enabled: true,
        },
        dropShadow: {
          enabled: true,
          top: 1,
          left: 1,
          blur: 2,
          opacity: 0.2,
        },
      },
      series: [
        {
          data: [47, 45, 74, 32, 56, 31, 44, 33, 45, 19],
        },
      ],
      stroke: {
        curve: 'smooth',
      },
      markers: {
        size: 0,
      },
      grid: {
        padding: {
          top: 20,
          bottom: 10,
          left: 110,
        },
      },
      colors: ['#fff'],
      xaxis: {
        crosshairs: {
          width: 1,
        },
      },
      tooltip: {
        x: {
          show: false,
        },
        y: {
          title: {
            formatter: () => '',
          },
        },
      },
    };

    const spark4 = {
      chart: {
        id: 'spark4',
        group: 'sparks',
        type: 'line',
        height: 80,
        sparkline: {
          enabled: true,
        },
        dropShadow: {
          enabled: true,
          top: 1,
          left: 1,
          blur: 2,
          opacity: 0.2,
        },
      },
      series: [
        {
          data: [15, 75, 47, 65, 14, 32, 19, 54, 44, 61],
        },
      ],
      stroke: {
        curve: 'smooth',
      },
      markers: {
        size: 0,
      },
      grid: {
        padding: {
          top: 20,
          bottom: 10,
          left: 110,
        },
      },
      colors: ['#fff'],
      xaxis: {
        crosshairs: {
          width: 1,
        },
      },
      tooltip: {
        x: {
          show: false,
        },
        y: {
          title: {
            formatter: () => '',
          },
        },
      },
    };

    new ApexCharts(document.querySelector('#spark1'), spark1).render();
    new ApexCharts(document.querySelector('#spark2'), spark2).render();
    new ApexCharts(document.querySelector('#spark3'), spark3).render();
    new ApexCharts(document.querySelector('#spark4'), spark4).render();

    const optionsLine = {
      chart: {
        height: 328,
        type: 'line',
        zoom: {
          enabled: false,
        },
        dropShadow: {
          enabled: true,
          top: 3,
          left: 2,
          blur: 4,
          opacity: 1,
        },
      },
      stroke: {
        curve: 'smooth',
        width: 2,
      },
      series: [
        {
          name: 'Music',
          data: [1, 15, 26, 20, 33, 27],
        },
        {
          name: 'Photos',
          data: [3, 33, 21, 42, 19, 32],
        },
        {
          name: 'Files',
          data: [0, 39, 52, 11, 29, 43],
        },
      ],
      title: {
        text: 'Media',
        align: 'left',
        offsetY: 25,
        offsetX: 20,
      },
      subtitle: {
        text: 'Statistics',
        offsetY: 55,
        offsetX: 20,
      },
      markers: {
        size: 6,
        strokeWidth: 0,
        hover: {
          size: 9,
        },
      },
      grid: {
        show: true,
        padding: {
          bottom: 0,
        },
      },
      labels: [
        '01/15/2002',
        '01/16/2002',
        '01/17/2002',
        '01/18/2002',
        '01/19/2002',
        '01/20/2002',
      ],
      xaxis: {
        tooltip: {
          enabled: false,
        },
      },
      legend: {
        position: 'top',
        horizontalAlign: 'right',
        offsetY: -20,
      },
    };

    const chartLine = new ApexCharts(
      document.querySelector('#line-adwords'),
      optionsLine
    );
    chartLine.render();

    const optionsCircle4 = {
      chart: {
        type: 'radialBar',
        height: 350,
        width: 380,
      },
      plotOptions: {
        radialBar: {
          size: undefined,
          inverseOrder: true,
          hollow: {
            margin: 5,
            size: '48%',
            background: 'transparent',
          },
          track: {
            show: false,
          },
          startAngle: -180,
          endAngle: 180,
        },
      },
      stroke: {
        lineCap: 'round',
      },
      series: [71, 63, 77],
      labels: ['June', 'May', 'April'],
      legend: {
        show: true,
        floating: true,
        position: 'right',
        offsetX: 70,
        offsetY: 200,
      },
    };

    const chartCircle4 = new ApexCharts(
      document.querySelector('#radialBarBottom'),
      optionsCircle4
    );
    chartCircle4.render();

    const optionsBar = {
      chart: {
        height: 380,
        type: 'bar',
        stacked: true,
      },
      plotOptions: {
        bar: {
          columnWidth: '30%',
          horizontal: false,
        },
      },
      series: [
        {
          name: 'PRODUCT A',
          data: [14, 25, 21, 17, 12, 13, 11, 19],
        },
        {
          name: 'PRODUCT B',
          data: [13, 23, 20, 8, 13, 27, 33, 12],
        },
        {
          name: 'PRODUCT C',
          data: [11, 17, 15, 15, 21, 14, 15, 13],
        },
      ],
      xaxis: {
        categories: [
          '2011 Q1',
          '2011 Q2',
          '2011 Q3',
          '2011 Q4',
          '2012 Q1',
          '2012 Q2',
          '2012 Q3',
          '2012 Q4',
        ],
      },
      fill: {
        opacity: 1,
      },
    };

    const chartBar = new ApexCharts(
      document.querySelector('#barchart'),
      optionsBar
    );
    chartBar.render();

    const optionsArea: ApexOptions = {
      chart: {
        height: 380,
        type: 'area',
        stacked: false,
      },
      stroke: {
        curve: 'straight',
      },
      series: [
        {
          name: 'Music',
          data: [11, 15, 26, 20, 33, 27],
        },
        {
          name: 'Photos',
          data: [32, 33, 21, 42, 19, 32],
        },
        {
          name: 'Files',
          data: [20, 39, 52, 11, 29, 43],
        },
      ],
      xaxis: {
        categories: [
          '2011 Q1',
          '2011 Q2',
          '2011 Q3',
          '2011 Q4',
          '2012 Q1',
          '2012 Q2',
        ],
      },
      tooltip: {
        followCursor: true,
      },
      fill: {
        opacity: 1,
      },
    };

    const chartArea = new ApexCharts(
      document.querySelector('#areachart') as HTMLElement,
      optionsArea
    );

    chartArea.render();

    // Cleanup on unmount
    return () => {
      chartArea.destroy();
    };
  }, []);

  return (
    <>
      <title>Dashboard - Dark Style</title>
      <link
        rel='stylesheet'
        href='https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css'
      />
      <link
        href='https://fonts.googleapis.com/css?family=Montserrat'
        rel='stylesheet'
      />
      <link
        rel='stylesheet'
        href='https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css'
      />
      <link rel='stylesheet' href='assets/styles.css' />

      <div id='wrapper'>
        <div className='content-area'>
          <div className='container-fluid'>
            <div className='main'>
              <div className='row sparkboxes mt-4'>
                <div className='col-md-3'>
                  <div className='box box1'>
                    <div className='details'>
                      <h3>1213</h3>
                      <h4>CLICKS</h4>
                    </div>
                    <div id='spark1'></div>
                  </div>
                </div>
                <div className='col-md-3'>
                  <div className='box box2'>
                    <div className='details'>
                      <h3>422</h3>
                      <h4>VIEWS</h4>
                    </div>
                    <div id='spark2'></div>
                  </div>
                </div>
                <div className='col-md-3'>
                  <div className='box box3'>
                    <div className='details'>
                      <h3>311</h3>
                      <h4>LEADS</h4>
                    </div>
                    <div id='spark3'></div>
                  </div>
                </div>
                <div className='col-md-3'>
                  <div className='box box4'>
                    <div className='details'>
                      <h3>22</h3>
                      <h4>SALES</h4>
                    </div>
                    <div id='spark4'></div>
                  </div>
                </div>
              </div>

              <div className='row mt-4'>
                <div className='col-md-5'>
                  <div className='box shadow mt-4'>
                    <div id='radialBarBottom'></div>
                  </div>
                </div>
                <div className='col-md-7'>
                  <div className='box shadow mt-4'>
                    <div id='line-adwords' className=''></div>
                  </div>
                </div>
              </div>

              <div className='row mt-4'>
                <div className='col-md-5'>
                  <div className='box shadow mt-4'>
                    <div id='barchart'></div>
                  </div>
                </div>
                <div className='col-md-7'>
                  <div className='box shadow mt-4'>
                    <div id='areachart'></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
