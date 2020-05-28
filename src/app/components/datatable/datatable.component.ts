import { Component } from '@angular/core';

enum routedReason {
  NUMBER_NOT_EXIST = 'NumberDoesnotExist',
  NO_PREFIX = 'NoPrefixAvailable',
  NO_APPLICATBLE_ROUTE = 'NoApplicableRouteFound',
  EMPTY = ''
}

enum requestedStatus {
  SUBMITTED = 'Submitted',
  FAILED = 'Failed',
  IN_PROGRESS = 'InProgress'
}

interface TableDataI {
  poolNumber: number;
  sender: number | string;
  notRoutedReason: routedReason;
  sentDateTime: string;
  requestedDeliveryReportMaskText: requestedStatus;
  deliveryReportReceivedDateTime: string;
  isUnicode: boolean;
  messageUUID: string;
}

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.scss']
})
export class DatatableComponent {
  fileToUpload: File = null;
  sortBy: string;

  tableHeader = {
    poolNumber: 'poolNumber',
    sender: 'sender',
    notRoutedReason: 'notRoutedReason',
    sentDateTime: 'sentDateTime',
    requestedDeliveryReportMaskText: 'requestedDeliveryReportMaskText',
    deliveryReportReceivedDateTime: 'deliveryReportReceivedDateTime',
    isUnicode: 'isUnicode',
    messageUUID: 'messageUUID'
  };

  tableColumns: Array<TableDataI> = [
    {
      poolNumber: 1,
      sender: 'Name',
      notRoutedReason: routedReason.NUMBER_NOT_EXIST,
      sentDateTime: '2019-08-13T08:01:48.1535075Z',
      requestedDeliveryReportMaskText: requestedStatus.SUBMITTED,
      deliveryReportReceivedDateTime: '2019-08-13T08:01:48.1535075Z',
      isUnicode: true,
      messageUUID: '3c249a2b-3078-4a04-a4a7-9a4144f58aed'
    }
  ];

  constructor() { }

  asIsOrder(a, b) {
    return 1;
  }
  
  sortCol(key) {
    this.sortBy = key;
    this.tableColumns.sort((a, b) => {
      const vala = a[this.sortBy];
      const valb = b[this.sortBy];

      return ('' + vala).localeCompare(valb);
    });
  }

  openFile(event) {
    let input = event.target;
    for (var index = 0; index < input.files.length; index++) {
      let reader = new FileReader();
      reader.onload = () => {
        let lines = (reader.result as string).split('\n');
        let headers = lines.shift().split(",");
        let result = [];

        lines.forEach((line) => {
          let obj = {};
          let currentline = line.split(",");

          headers.forEach((val, index) => {
            obj[val] = currentline[index];
          }); 
          result.push(obj);
        });
        this.tableColumns = result;
      };
      reader.readAsText(input.files[index]);
    };
  }

}

            // try {
            //   headers.forEach(key => {
            //     if (!(key.toString() in this.tableHeader)){
            //       console.log(key.toString())
            //       console.log(Object.keys(this.tableHeader))
            //       throw '';
            //     }
            //   });
            // } catch (e) {
            //   alert('worng file data');
            // }

