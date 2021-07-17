import { Component, OnInit } from '@angular/core';
import {HttpService} from '../../../../core/services/http.service';
import {SnackbarService} from '../../../../core/services/snackbar.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  projects: any;
  currentProject: {
    openedProjectId: string;
    isMrApproved?: boolean;
    approvals?: any;
    tree?: any[];
  };

  constructor(
    private httpService: HttpService,
    private snackService: SnackbarService
  ) { }

  ngOnInit(): void {
    this.getProjects();
  }
  getProjects(): void{
    this.httpService
      .get('projects')
      .subscribe(projects => this.projects = projects);
  }
  getProject(id: string): void {
    this.currentProject = {
      openedProjectId: id
    };
    this.httpService
      .get(`projects/${id}/repository/tree`)
      .subscribe(tree => {
        this.currentProject.tree = tree;
      });
  }
  async createMergeReq(id: string): Promise<void> {
    // sending mr....
    const approvals = await this.getApprovals(id);
    this.currentProject.approvals = approvals;
    this.currentProject.isMrApproved = this.currentProject.approvals.approvals_left === 0;
  }
  async getApprovals(id: string): Promise<boolean> {
    return await this.httpService
      .get(`projects/${id}/approvals`)
      .toPromise()
      .then(approvals => approvals);
  }
  async sendMergeRequest(id: string): Promise<void> {
    // merging....
    this.snackService.setSnackbarMessage(`Merged Successfully`);
  }
}
