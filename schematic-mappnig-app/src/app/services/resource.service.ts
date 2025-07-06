import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Resource {
  id?: number;
  FileName: string;
  FileExtension?: string;
  FileType?: string;
  MediaType?: string;
  Content: any;
  Size: number;
}

@Injectable({ providedIn: 'root' })
export class ResourceService {
  private apiUrl = 'http://localhost:3001/api/resources';

  constructor(private http: HttpClient) {}

  getResources(): Observable<Resource[]> {
    return this.http.get<Resource[]>(this.apiUrl);
  }

  getResource(id: number): Observable<Resource> {
    return this.http.get<Resource>(`${this.apiUrl}/${id}`);
  }

  createResource(resource: Resource): Observable<{ id: number }> {
    return this.http.post<{ id: number }>(this.apiUrl, resource);
  }

  updateResource(id: number, resource: Resource): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, resource);
  }

  deleteResource(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
