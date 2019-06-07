export default class User{
	constructor(data){
		this.name = data.name;
		this.email = data.email;
		this.repoCount = data.public_repos;
		this.followers = data.followers;
		this.following = data.following;
		this.reposUrl = data.repos_url;
		this.avatar = data.avatar_url;
		this.createdAt = data.created_at;
	}
}

