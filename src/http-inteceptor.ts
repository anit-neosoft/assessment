import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, materialize, dematerialize } from 'rxjs/operators';
import { User, UserInput } from './app/shared/models/user.interface';
import {
  ApplyLeave,
  LeaveStatus,
} from './app/shared/components/apply-leave/models/apply-leave';
import { UserType } from './app/auth/models/user-type.enum';

// array in local storage for registered users
const usersKey = 'neosoft-assessment-users';
const leaveKey = 'neosoft-assessment-leaves';
let users: User[] = JSON.parse(localStorage.getItem(usersKey)!) || [];
let leaves: ApplyLeave[] = JSON.parse(localStorage.getItem(leaveKey)!) || [];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const { url, method, headers, body } = request;
    console.log('Request', request);

    return handleRoute();

    function handleRoute() {
      switch (true) {
        case url.endsWith('/users/authenticate') && method === 'POST':
          return authenticate();
        case url.endsWith('/users/register') && method === 'POST':
          return register();
        // case url.endsWith('/users') && method === 'GET':
        //   return getUsers();
        case url.match(/\/users\/\d+$/) && method === 'GET':
          return getUserById();
        case url.match(/^\/hod\/teacher\/\d+$/) && method === 'DELETE':
          return deleteUser();
        case url.endsWith('/apply-leave') && method === 'POST':
          return applyLeave();
        case url.match('/leave-management/hod') && method === 'POST':
          return getLeaveManagementDetailForHod();
        case url.endsWith('/leave-management/approve') && method === 'POST':
          return approveLeave();
        case url.endsWith('/leave-management/reject') && method === 'POST':
          return rejectLeave();
        case url.endsWith('/leave-management/teacher') && method === 'POST':
          return getLeaveManagementDetailForTeacher();
        case url.endsWith('/hod/teachers') && method === 'POST':
          return getTeacherForCurrentHod();
        default:
          // pass through any requests not handled above
          return next.handle(request);
      }
    }

    // route functions

    function getTeacherForCurrentHod() {
      const { department } = body;
      console.log('Department', department);

      const teachers = users
        .filter(
          (x) =>
            x.department === department &&
            parseInt(x.userType) === UserType.Teacher
        )
        .map((teacher, index) => {
          return {
            srNo: index + 1,
            id: teacher.id,
            name: `${teacher.firstName} ${teacher.lastName}`,
            username: teacher.username,
            email: teacher.email,
            mobile: teacher.contact,
            profileImage: teacher.profileImage,
            basicDetails: basicDetails(teacher),
          };
        });
      return ok(teachers);
    }

    function authenticate() {
      const { username, password } = body;
      const user = users.find(
        (x) => x.username === username && x.password === password
      );
      if (!user) return error('Username or password is incorrect');
      return ok({
        ...basicDetails(user),
        token: Math.random().toString(36).substr(2),
      });
    }

    function register() {
      const user: UserInput = body;
      const newUser: User = {
        ...user,
        id: users.length ? Math.max(...users.map((x) => x.id)) + 1 : 1,
      };
      if (users.find((x) => x.username === user.username)) {
        return error('Username "' + user.username + '" is already taken');
      }
      users.push(newUser);
      localStorage.setItem(usersKey, JSON.stringify(users));
      return ok({ message: 'User registered successfully' });
    }
    function applyLeave() {
      const leave: ApplyLeave = body;
      const newLeave: ApplyLeave = {
        ...leave,
        leaveId: leaves.length
          ? Math.max(...leaves.map((x) => x.leaveId || 0)) + 1
          : 1,
      };
      leaves.push(newLeave);
      localStorage.setItem(leaveKey, JSON.stringify(leaves));
      return ok({ message: 'Leave applied successfully' });
    }
    function getLeaveManagementDetailForHod() {
      const { department } = body;
      console.log('Department', department);

      const pendingLeaves = leaves
        .filter(
          (x) => x.department === department && x.status === LeaveStatus.Pending
        )
        .map((leave, index) => {
          const user = users.find((x) => x.id === leave.userId);

          return {
            srNo: index + 1, // Add the serial number field
            name: `${user?.firstName} ${user?.lastName}`,
            email: user?.email,
            fromDate: leave.fromDate,
            toDate: leave.toDate,
            reason: leave.reason,
            status: leave.status,
            leaveId: leave.leaveId,
            userId: leave.userId,
          };
        });

      return ok(pendingLeaves);
    }
    function getLeaveManagementDetailForTeacher() {
      // I want to return srno, fromDate, toDate, reason, status of the leaves applied by the teacher
      const { id } = body;
      console.log('ID', id);
      const teacherLeaves = leaves
        .filter((x) => x.userId === id)
        .map((leave, index) => {
          return {
            srNo: index + 1,
            fromDate: leave.fromDate,
            toDate: leave.toDate,
            reason: leave.reason,
            status: leave.status,
          };
        });
      return ok(teacherLeaves);
    }
    function approveLeave() {
      const { id } = body;
      console.log('Leave ID', id);

      const leave = leaves.find((x) => x.leaveId === id);
      if (!leave) return error('Leave not found');
      leave.status = LeaveStatus.Approved;
      localStorage.setItem(leaveKey, JSON.stringify(leaves));
      return ok();
    }
    function rejectLeave() {
      const { id } = body;
      const leave = leaves.find((x) => x.leaveId === id);
      if (!leave) return error('Leave not found');
      leave.status = LeaveStatus.Rejected;
      localStorage.setItem(leaveKey, JSON.stringify(leaves));
      return ok();
    }

    function getUserById() {
      const user = users.find((x) => x.id === idFromUrl());
      return ok(basicDetails(user!));
    }

    function deleteUser() {
      users = users.filter((x) => x.id !== idFromUrl());
      localStorage.setItem(usersKey, JSON.stringify(users));
      return ok();
    }

    // helper functions

    function ok(body?: any) {
      return of(new HttpResponse({ status: 200, body })).pipe(delay(500)); // delay observable to simulate server api call
    }

    function error(message: string) {
      return throwError(() => ({ error: { message } })).pipe(
        materialize(),
        delay(500),
        dematerialize()
      ); // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648);
    }

    function unauthorized() {
      return throwError(() => ({
        status: 401,
        error: { message: 'Unauthorized' },
      })).pipe(materialize(), delay(500), dematerialize());
    }

    function basicDetails(user: User) {
      const {
        id,
        contact,
        department,
        email,
        firstName,
        lastName,
        userType,
        username,
        profileImage,
      } = user;
      return {
        id,
        contact,
        department,
        email,
        lastName,
        firstName,
        userType,
        username,
        profileImage,
      };
    }

    function idFromUrl() {
      const urlParts = url.split('/');
      return parseInt(urlParts[urlParts.length - 1]);
    }
  }
}

export const fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true,
};
