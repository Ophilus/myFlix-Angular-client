import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'
import { MatDialog } from '@angular/material/dialog';

import { DirectorComponent } from '../director/director.component';
import { GenreComponent } from '../genre/genre.component';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  favouriteMovies: any[] = [];
  constructor(
    public fetchApiData: FetchApiDataService,
    public MatDialog: MatDialog,
    ) { }


  ngOnInit(): void {
    this.getFavouriteMovies();
    console.log(this.favouriteMovies);
    this.getMovies();
    
  }
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
        this.movies = resp;
        console.log(this.movies);
        return this.movies;
      });
    }
    openDirectorDialog(name: string, bio: string, birthday: Date): void {
      this.MatDialog.open(DirectorComponent, {
        data: {
          Name: name,
          Bio: bio,
          Birthday: birthday,
        },
        // Assign dialog width
        width: '500px'
      });
    }

    openGenreDialog(name: string, description: string): void {
      this.MatDialog.open(GenreComponent, {
        data: {
          Name: name,
          Description: description,
        },
        // Assign dialog width
        width: '500px'
      });
    }

    openMovieDetailsDialog(title: string, description: string): void {
      this.MatDialog.open(MovieDetailsComponent, {
        data: {
          Title: title,
          Description: description,
        },
        // Assign dialog width
        width: '500px'
      });
    }
    getFavouriteMovies(): void {
      this.fetchApiData.getFavouriteMovies().subscribe((resp: any) => {
        this.favouriteMovies = resp;
        console.log(this.favouriteMovies);
        return this.favouriteMovies;
      });
    }

    addToFavoriteMovies(id: string): void {
      console.log(id);
      this.fetchApiData.addFavouriteMovies(id).subscribe((result) => {
        console.log(result);
        this.ngOnInit();
      })
    }

    removeFromFavoriteMovies(id: string): void {
      console.log(id);
      this.fetchApiData.deleteFavouriteMovies(id).subscribe((result) => {
        console.log(result);
        this.ngOnInit();
      })
    }
    isFavourite(id: string): boolean {
      return this.favouriteMovies.includes(id)
    }
  }
  