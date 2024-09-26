using AutoMapper;
using backend.Entities;
using backend.Models;

namespace backend.Mappers
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<ToDoGroup, ToDoGroupDto>();

            CreateMap<User, UserDto>()
                .ForMember(dest => dest.ToDoGroups, opt => opt.MapFrom(src => src.ToDoGroups.Where(g => g.Visible == true)));
        }
    }
}
